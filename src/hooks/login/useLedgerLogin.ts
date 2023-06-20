import { useEffect, useState } from 'react';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { SECOND_LOGIN_ATTEMPT_ERROR } from 'constants/errorsMessages';
import { getLedgerConfiguration } from 'providers';
import { setAccountProvider } from 'providers/accountProvider';
import { loginAction } from 'reduxStore/commonActions';
import { useDispatch, useSelector } from 'reduxStore/DappProviderContext';
import { ledgerAccountSelector } from 'reduxStore/selectors';
import {
  setLedgerAccount,
  setLedgerLogin,
  updateLedgerAccount
} from 'reduxStore/slices';
import { LoginMethodsEnum } from 'types/enums.types';
import { getLedgerErrorCodes, optionalRedirect } from 'utils/internal';
import {
  InitiateLoginFunctionType,
  LoginHookGenericStateType,
  OnProviderLoginType
} from '../../types';
import { getIsLoggedIn } from '../../utils';
import { useAddressScreens } from './useAddressScreens';
import { useLoginService } from './useLoginService';

const failInitializeErrorText = 'Check if the MultiversX App is open on Ledger';

export interface UseLedgerLoginPropsType extends OnProviderLoginType {
  addressesPerPage?: number;
}

export interface SelectedAddress {
  address: string;
  index: number;
}

export interface LedgerLoginHookCustomStateType {
  accounts: string[];
  showAddressList: boolean;
  startIndex: number;
  selectedAddress: SelectedAddress | null;
  version: string;
  contractDataEnabled: boolean;

  onGoToPrevPage: () => void;
  onGoToNextPage: () => void;
  onSelectAddress: (address: SelectedAddress | null) => void;
  onConfirmSelectedAddress: () => void;
}

export type LedgerLoginHookReturnType = [
  InitiateLoginFunctionType,
  LoginHookGenericStateType,
  LedgerLoginHookCustomStateType
];

export function useLedgerLogin({
  callbackRoute,
  token: tokenToSign,
  addressesPerPage: configuredAddressesPerPage,
  nativeAuth,
  onLoginRedirect
}: UseLedgerLoginPropsType): LedgerLoginHookReturnType {
  const ledgerAccount = useSelector(ledgerAccountSelector);
  const dispatch = useDispatch();
  const isLoggedIn = getIsLoggedIn();
  const hasNativeAuth = nativeAuth != null;
  const loginService = useLoginService(nativeAuth);
  let token = tokenToSign;

  const {
    accounts,
    setAccounts,
    isLoading,
    setIsLoading,
    setShowAddressList,
    showAddressList,
    startIndex,
    selectedAddress,
    onGoToPrevPage,
    onGoToNextPage,
    onSelectAddress,
    error,
    setError,
    defaultAddressesPerPage
  } = useAddressScreens();

  const addressesPerPage =
    configuredAddressesPerPage ?? defaultAddressesPerPage;

  const hwWalletP = new HWProvider();
  const [version, setVersion] = useState('');
  const [contractDataEnabled, setContractDataEnabled] = useState(false);

  function dispatchLoginActions({
    provider,
    address,
    index,
    signature
  }: {
    provider: HWProvider;
    address: string;
    index: number;
    signature?: string;
  }) {
    setAccountProvider(provider);

    dispatch(setLedgerLogin({ index, loginType: LoginMethodsEnum.ledger }));

    if (signature) {
      loginService.setTokenLoginInfo({ signature, address });
    }

    dispatch(loginAction({ address, loginMethod: LoginMethodsEnum.ledger }));

    optionalRedirect({
      callbackRoute,
      onLoginRedirect,
      options: { address, signature }
    });
  }

  const onLoginFailed = (err: any, customMessage = '') => {
    const { errorMessage } = getLedgerErrorCodes(err);

    if (errorMessage) {
      setError(`${errorMessage}.${customMessage}`);
    }
    setIsLoading(false);
    console.warn(err);
    dispatch(setLedgerAccount(null));
  };

  async function loginUser(hwWalletProvider: HWProvider) {
    if (selectedAddress == null) {
      return false;
    }
    const { index } = selectedAddress;

    if (hasNativeAuth && !token) {
      token = await loginService.getNativeAuthLoginToken();
      // Fetching block failed
      if (!token) {
        console.warn('Fetching block failed. Login cancelled.');
        return;
      }
    }

    if (token) {
      loginService.setLoginToken(token);
      try {
        const loginInfo = await hwWalletProvider.tokenLogin({
          token: Buffer.from(`${token}{}`),
          addressIndex: index
        });
        dispatchLoginActions({
          address: loginInfo.address,
          provider: hwWalletProvider,
          index: index,
          signature: loginInfo.signature.toString('hex')
        });
      } catch (err) {
        onLoginFailed(err, '. Update MultiversX App to continue.');
      }
    } else {
      try {
        const address = await hwWalletProvider.login({ addressIndex: index });
        dispatchLoginActions({
          address,
          provider: hwWalletProvider,
          index
        });
      } catch (err) {
        onLoginFailed(err);
        return false;
      }
    }
    return true;
  }

  async function onConfirmSelectedAddress() {
    try {
      setIsLoading(true);
      if (selectedAddress == null) {
        return false;
      }
      if (ledgerAccount) {
        dispatch(updateLedgerAccount(selectedAddress));
      } else {
        dispatch(
          setLedgerAccount({
            ...selectedAddress,
            version,
            hasContractDataEnabled: contractDataEnabled
          })
        );
      }

      const hwWalletProvider = new HWProvider();
      const initialized = await hwWalletProvider.init();
      if (!initialized) {
        setError(failInitializeErrorText);
        console.warn(failInitializeErrorText);
        return false;
      }
      setIsLoading(false);
      await loginUser(hwWalletProvider);
    } catch (err) {
      const { errorMessage } = getLedgerErrorCodes(err);
      if (errorMessage) {
        setError(errorMessage);
      }
      console.warn(failInitializeErrorText, err);
    } finally {
      setIsLoading(false);
    }
    setShowAddressList(false);
    return true;
  }

  async function fetchAccounts() {
    try {
      setIsLoading(true);
      const initialized = await hwWalletP.init();
      if (!initialized) {
        setError(failInitializeErrorText);
        console.warn(failInitializeErrorText);
        setIsLoading(false);
        return;
      }
      const accounts = await hwWalletP.getAccounts(
        startIndex,
        addressesPerPage
      );
      const ledgerData = await getLedgerConfiguration(hwWalletP);
      setVersion(ledgerData.version);
      setContractDataEnabled(ledgerData.dataEnabled);
      setAccounts(accounts);
      setIsLoading(false);
    } catch (err) {
      const { errorMessage, defaultErrorMessage } = getLedgerErrorCodes(err);
      setError(errorMessage ?? defaultErrorMessage);
      console.error('error', err);
      setIsLoading(false);
    }
  }

  async function onStartLogin() {
    if (isLoggedIn) {
      throw new Error(SECOND_LOGIN_ATTEMPT_ERROR);
    }
    setError('');
    try {
      setIsLoading(true);
      if (ledgerAccount != null) {
        const hwWalletP = new HWProvider();
        const initialized = await hwWalletP.init();
        if (!initialized || !selectedAddress) {
          console.warn(failInitializeErrorText);
          return;
        }

        const address = await hwWalletP.login({
          addressIndex: selectedAddress.index.valueOf()
        });
        setAccountProvider(hwWalletP);

        if (!address) {
          setIsLoading(false);
          console.warn('Login cancelled.');
          return;
        }

        dispatch(
          loginAction({ address, loginMethod: LoginMethodsEnum.ledger })
        );
        optionalRedirect({
          callbackRoute,
          onLoginRedirect
        });
      } else {
        if (accounts?.length > 0) {
          setShowAddressList(true);
        } else {
          await fetchAccounts();
          setShowAddressList(true);
        }
      }
    } catch (error) {
      console.error('error ', error);
      const { defaultErrorMessage } = getLedgerErrorCodes();
      setError(defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, [startIndex]);

  const loginFailed = Boolean(error);

  return [
    onStartLogin,
    {
      loginFailed,
      isLoggedIn: isLoggedIn && !loginFailed,
      error,
      isLoading: isLoading && !loginFailed
    },
    {
      accounts,
      showAddressList,
      startIndex,
      selectedAddress,
      version,
      contractDataEnabled,

      onGoToPrevPage,
      onGoToNextPage,
      onSelectAddress,
      onConfirmSelectedAddress
    }
  ];
}

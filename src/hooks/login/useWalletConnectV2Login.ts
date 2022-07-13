import { useRef, useState } from 'react';
import {
  WalletConnectProviderV2,
  PairingTypes
} from '@elrondnetwork/erdjs-wallet-connect-provider';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import {
  getAccountProvider,
  setAccountProvider
} from 'providers/accountProvider';
import { loginAction } from 'reduxStore/commonActions';
import { useDispatch, useSelector } from 'reduxStore/DappProviderContext';
import { isLoggedInSelector } from 'reduxStore/selectors/loginInfoSelectors';
import {
  walletConnectV2RelaySelector,
  walletConnectV2ProjectIdSelector,
  chainIDSelector,
  walletConnectDeepLinkSelector
} from 'reduxStore/selectors/networkConfigSelectors';
import {
  setTokenLogin,
  setTokenLoginSignature,
  setWalletConnectLogin
} from 'reduxStore/slices';
import { LoginHookGenericStateType } from 'types';
import { LoginMethodsEnum } from 'types/enums';
import { logout } from 'utils';
import { optionalRedirect } from 'utils/internal';
import { getIsProviderEqualTo } from 'utils/account/getIsProviderEqualTo';

interface InitWalletConnectV2Type {
  logoutRoute: string;
  token?: string;
  callbackRoute?: string;
  onLoginRedirect?: (callbackRoute: string) => void;
}

export enum WalletConnectV2Error {
  invalidAddress = 'Invalid address',
  invalidConfig = 'Invalid WalletConnect setup',
  invalidTopic = 'Expired connection',
  sessionExpired = 'Unable to connect to existing session'
}

export interface WalletConnectV2LoginHookCustomStateType {
  uriDeepLink: string;
  connectExisting: (pairing: PairingTypes.Struct) => Promise<void>;
  walletConnectUri?: string;
  wcPairings?: PairingTypes.Struct[];
}

export type WalletConnectV2LoginHookReturnType = [
  (loginProvider?: boolean) => void,
  LoginHookGenericStateType,
  WalletConnectV2LoginHookCustomStateType
];

export const useWalletConnectV2Login = ({
  callbackRoute,
  logoutRoute,
  token,
  onLoginRedirect
}: InitWalletConnectV2Type): WalletConnectV2LoginHookReturnType => {
  const dispatch = useDispatch();

  const [error, setError] = useState<string>('');
  const [wcUri, setWcUri] = useState<string>('');
  const [wcPairings, setWcPairings] = useState<
    PairingTypes.Struct[] | undefined
  >([]);

  const provider = getAccountProvider();
  const walletConnectV2RelayAddress = useSelector(walletConnectV2RelaySelector);
  const walletConnectV2ProjectId = useSelector(
    walletConnectV2ProjectIdSelector
  );
  const chainId = useSelector(chainIDSelector);
  const walletConnectDeepLink = useSelector(walletConnectDeepLinkSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const providerRef = useRef<any>(provider);

  const hasWcUri = Boolean(wcUri);
  const isLoading = !hasWcUri;
  const uriDeepLink = hasWcUri
    ? `${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(wcUri)}`
    : '';

  useUpdateEffect(() => {
    generateWcUri();
  }, [token]);

  useUpdateEffect(() => {
    providerRef.current = provider;
  }, [provider]);

  const handleOnLogout = () => {
    logout(logoutRoute);
  };

  async function handleOnLogin() {
    try {
      const provider = providerRef.current;

      if (
        isLoggedIn ||
        provider == null ||
        !getIsProviderEqualTo(LoginMethodsEnum.walletconnectv2)
      ) {
        return;
      }

      const address = await provider.getAddress();
      const signature = await provider.getSignature();
      const hasSignature = Boolean(signature);
      const loginActionData = {
        address: address,
        loginMethod: LoginMethodsEnum.walletconnectv2
      };

      const loginData = {
        logoutRoute: logoutRoute,
        loginType: 'walletconnectv2',
        callbackRoute: callbackRoute ?? window.location.href
      };

      if (hasSignature) {
        dispatch(setWalletConnectLogin(loginData));
        dispatch(setTokenLoginSignature(signature));
      } else {
        dispatch(setWalletConnectLogin(loginData));
      }

      dispatch(loginAction(loginActionData));
      optionalRedirect(callbackRoute, onLoginRedirect);
    } catch (err) {
      setError(WalletConnectV2Error.invalidAddress);
      console.error(err);
    }
  }

  async function initiateLogin(loginProvider = true) {
    const shouldGenerateWcUri = loginProvider && !wcUri;
    if (
      !walletConnectV2ProjectId ||
      !walletConnectV2RelayAddress ||
      (providerRef?.current?.isInitialized?.() && !shouldGenerateWcUri)
    ) {
      setError(WalletConnectV2Error.invalidConfig);

      return;
    }

    const providerHandlers = {
      onClientLogin: handleOnLogin,
      onClientLogout: handleOnLogout
    };

    const newProvider = new WalletConnectProviderV2(
      providerHandlers,
      chainId,
      walletConnectV2RelayAddress,
      walletConnectV2ProjectId
    );

    await newProvider.init();
    setAccountProvider(newProvider);
    setWcPairings(newProvider.pairings);
    providerRef.current = newProvider;
    if (loginProvider) {
      generateWcUri();
    }
  }

  async function connectExisting(pairing: PairingTypes.Struct) {
    if (!walletConnectV2RelayAddress || !walletConnectV2ProjectId) {
      setError(WalletConnectV2Error.invalidConfig);
      return;
    }
    if (!pairing || !pairing.topic) {
      setError(WalletConnectV2Error.invalidTopic);
      return;
    }

    try {
      const { approval } = await providerRef.current?.connect({
        topic: pairing.topic
      });
      if (token) {
        dispatch(setTokenLogin({ loginToken: token }));
      }

      try {
        await providerRef.current?.login({ approval });
      } catch (err) {
        console.warn('User rejected existing connection proposal ', err);

        await initiateLogin();
      }
    } catch (err) {
      console.error('Error while attempting to retore connection ', err);
      setError(WalletConnectV2Error.sessionExpired);
    } finally {
      setWcPairings(providerRef.current?.pairings);
    }
  }

  async function generateWcUri() {
    if (!walletConnectV2RelayAddress || !walletConnectV2ProjectId) {
      setError(WalletConnectV2Error.invalidConfig);
      return;
    }

    const { uri, approval } = await providerRef.current?.connect();
    const hasUri = Boolean(uri);

    if (!hasUri) {
      return;
    }

    if (!token) {
      setWcUri(uri);
    } else {
      const wcUriWithToken = `${uri}&token=${token}`;

      setWcUri(wcUriWithToken);
      dispatch(setTokenLogin({ loginToken: token }));
    }

    try {
      await providerRef.current?.login({ approval });
    } catch (err) {
      console.warn('User rejected connection proposal ', err);

      await initiateLogin();
    }
  }

  const loginFailed = Boolean(error);
  return [
    initiateLogin,
    {
      error,
      loginFailed,
      isLoading: isLoading && !loginFailed,
      isLoggedIn: isLoggedIn && !loginFailed
    },
    { uriDeepLink, walletConnectUri: wcUri, connectExisting, wcPairings }
  ];
};

import { useEffect } from 'react';
import { HWProvider, ExtensionProvider } from '@elrondnetwork/erdjs';
import { loginAction } from 'redux/commonActions';
import { useDispatch, useSelector } from 'redux/DappProviderContext';
import {
  loginMethodSelector,
  walletConnectLoginSelector,
  networkSelector,
  proxySelector,
  walletLoginSelector,
  addressSelector,
  ledgerAccountSelector,
  ledgerLoginSelector,
  isLoggedInSelector
} from 'redux/selectors';
import { extraActionsSelector } from 'redux/selectors/extraActionsSelectors';
import {
  setAccount,
  setIsAccountLoading,
  setAccountLoadingError,
  setLedgerAccount,
  setProvider,
  setWalletLogin,
  setChainID
} from 'redux/slices';
import { useWalletConnectLogin } from 'services/login/useWalletConnectLogin';
import { LoginMethodsEnum } from 'types/enums';
import {
  newWalletProvider,
  getAddress,
  getAccount,
  getLatestNonce,
  logout
} from 'utils';

export default function ProviderInitializer() {
  const network = useSelector(networkSelector);
  const walletConnectLogin = useSelector(walletConnectLoginSelector);
  const loginMethod = useSelector(loginMethodSelector);
  const walletLogin = useSelector(walletLoginSelector);
  const { getProvider } = useSelector(extraActionsSelector);
  const address = useSelector(addressSelector);
  const ledgerAccount = useSelector(ledgerAccountSelector);
  const ledgerLogin = useSelector(ledgerLoginSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const proxy = useSelector(proxySelector);
  const dispatch = useDispatch();

  const { callbackRoute, logoutRoute } = walletConnectLogin
    ? walletConnectLogin
    : { callbackRoute: '', logoutRoute: '' };

  const [initWalletLoginProvider] = useWalletConnectLogin({
    callbackRoute,
    logoutRoute
  });

  useEffect(() => {
    refreshChainID();
  }, [network]);

  useEffect(() => {
    initializeProvider();
  }, [loginMethod]);

  useEffect(() => {
    fetchAccount();
  }, [address, ledgerLogin, isLoggedIn]);

  function refreshChainID() {
    proxy
      .getNetworkConfig()
      .then((networkConfig) => {
        dispatch(setChainID(networkConfig.ChainID.valueOf()));
      })
      .catch((e) => {
        console.error('To do ', e);
      });
  }

  async function fetchAccount() {
    dispatch(setIsAccountLoading(true));
    if (address && isLoggedIn) {
      try {
        const account = await getAccount(address);
        dispatch(
          setAccount({
            balance: account.balance.toString(),
            address,
            nonce: account.nonce.valueOf()
          })
        );
        if (ledgerAccount == null && ledgerLogin != null) {
          dispatch(
            setLedgerAccount({
              index: ledgerLogin.index,
              address
            })
          );
        }
      } catch (e) {
        dispatch(setAccountLoadingError('Failed getting account'));
        console.error('Failed getting account ', e);
      }
    }
    dispatch(setIsAccountLoading(false));
  }

  async function tryAuthenticateWalletUser() {
    try {
      if (walletLogin != null) {
        const provider = newWalletProvider(network.walletAddress);
        const address = await getAddress();
        if (address) {
          dispatch(setProvider(provider));
          dispatch(
            loginAction({ address, loginMethod: LoginMethodsEnum.wallet })
          );
          const account = await getAccount(address);
          dispatch(
            setAccount({
              balance: account.balance.toString(),
              address,
              nonce: getLatestNonce(account)
            })
          );
        }
        dispatch(setWalletLogin(null));
      }
    } catch (e) {
      console.error('Failed authenticating wallet user ', e);
    }
  }

  async function setLedgerProvider() {
    try {
      const hwWalletP = new HWProvider(proxy);

      const isInitializationSuccessful = await hwWalletP.init();
      if (ledgerLogin?.index != null) {
        hwWalletP.addressIndex = ledgerLogin.index;
      }
      if (!isInitializationSuccessful) {
        console.warn('Could not initialise ledger app');
        logout();
        return;
      }

      dispatch(setProvider(hwWalletP));
    } catch (err) {
      console.error('Could not initialise ledger app', err);
      logout();
    }
  }

  async function setExtensionProvider() {
    try {
      const address = await getAddress();
      const provider = ExtensionProvider.getInstance().setAddress(address);
      const success = await provider.init();

      if (success) {
        dispatch(setProvider(provider));
      } else {
        console.error(
          'Could not initialise extension, make sure Elrond wallet extension is installed.'
        );
      }
    } catch (err) {
      console.error('Unable to login to ExtensionProvider', err);
    }
  }

  function initializeProvider() {
    if (loginMethod == null) {
      return;
    }
    switch (loginMethod) {
      case LoginMethodsEnum.ledger: {
        setLedgerProvider();
        break;
      }

      case LoginMethodsEnum.walletconnect: {
        initWalletLoginProvider(false);
        break;
      }
      case LoginMethodsEnum.wallet: {
        const provider = newWalletProvider(network.walletAddress);
        dispatch(setProvider(provider));
        break;
      }

      case LoginMethodsEnum.extension: {
        setExtensionProvider();
        break;
      }

      case LoginMethodsEnum.extra: {
        const provider = getProvider();
        dispatch(setProvider(provider));
        break;
      }

      case LoginMethodsEnum.none: {
        tryAuthenticateWalletUser();
        break;
      }
      default:
        return;
    }
  }

  return null;
}

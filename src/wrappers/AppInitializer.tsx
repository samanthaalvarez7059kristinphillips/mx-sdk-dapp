import { useEffect, useMemo, useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { getServerConfiguration } from 'apiCalls';
import { fallbackNetworkConfigurations } from 'constants/network';
import { useGetAccountInfo } from 'hooks/account/useGetAccountInfo';
import { useDispatch, useSelector } from 'reduxStore/DappProviderContext';
import { isLoginSessionInvalidSelector } from 'reduxStore/selectors/loginInfoSelectors';
import { setDappConfig } from 'reduxStore/slices';
import { setLogoutRoute } from 'reduxStore/slices/loginInfoSlice';
import { initializeNetworkConfig } from 'reduxStore/slices/networkConfigSlice';
import {
  CustomNetworkType,
  DappConfigType,
  EnvironmentsEnum,
  IDappProvider
} from 'types';
import { logout } from 'utils/logout';

export interface UseAppInitializerPropsType {
  customNetworkConfig?: CustomNetworkType;
  externalProvider?: IDappProvider;
  environment: EnvironmentsEnum;
  dappConfig?: DappConfigType;
}

export interface AppInitializerPropsType extends UseAppInitializerPropsType {
  children?: any;
}

export const useAppInitializer = ({
  customNetworkConfig = {},
  environment,
  dappConfig
}: UseAppInitializerPropsType) => {
  const [initialized, setInitialized] = useState(false);
  const account = useGetAccountInfo();
  const isLoginSessionInvalid = useSelector(isLoginSessionInvalidSelector);

  // memoize dappConfig to avoid rerendering of AppInitializer
  const memoizedDappConfig = useMemo(() => dappConfig, []);
  const logoutRoute = memoizedDappConfig?.logoutRoute;

  const { address, publicKey } = account;
  const dispatch = useDispatch();

  async function initializeNetwork() {
    const fetchConfigFromServer = !customNetworkConfig?.skipFetchFromServer;
    const customNetworkApiAddress = customNetworkConfig?.apiAddress;
    const fallbackConfig = fallbackNetworkConfigurations[environment] || {};

    const localConfig = {
      ...fallbackConfig,
      ...customNetworkConfig
    };

    if (fetchConfigFromServer) {
      const fallbackApiAddress = fallbackConfig?.apiAddress;

      const serverConfig = await getServerConfiguration(
        customNetworkApiAddress || fallbackApiAddress
      );

      if (serverConfig != null) {
        const apiConfig = {
          ...fallbackConfig,
          ...serverConfig,
          ...customNetworkConfig
        };
        dispatch(initializeNetworkConfig(apiConfig));
        return;
      }
    }

    dispatch(initializeNetworkConfig(localConfig));
  }

  async function initializeApp() {
    if (memoizedDappConfig) {
      dispatch(setDappConfig(memoizedDappConfig));
    }
    dispatch(setLogoutRoute(logoutRoute));
    await initializeNetwork();

    setInitialized(true);
  }

  useEffect(() => {
    if (address) {
      const pubKey = new Address(address).hex();
      if (pubKey !== publicKey) {
        logout(logoutRoute);
      }
    }
  }, [address, publicKey, logoutRoute]);

  useEffect(() => {
    initializeApp();
  }, [customNetworkConfig, environment, memoizedDappConfig]);

  useEffect(() => {
    if (account.address && isLoginSessionInvalid) {
      logout(logoutRoute);
    }
  }, [isLoginSessionInvalid, account.address, logoutRoute]);

  return { initialized };
};

export function AppInitializer({
  customNetworkConfig = {},
  children,
  environment,
  dappConfig
}: AppInitializerPropsType) {
  const [isBrowser, setIsBrowser] = useState(!dappConfig?.isSSR);

  const { initialized } = useAppInitializer({
    customNetworkConfig,
    environment,
    dappConfig
  });

  // This is a hack to allow the app to render on the server side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser ? (initialized ? children : null) : children;
}

import {
  addressSelector,
  isLoggedInSelector,
  walletLoginSelector
} from 'reduxStore/selectors';
import { store } from 'reduxStore/store';
import { LoginMethodsEnum } from 'types/enums';
import { getIsProviderEqualTo } from 'utils/account/getIsProviderEqualTo';
import { addressIsValid } from './addressIsValid';
import { getAccountProvider } from 'providers';

export function getAddress(): Promise<string> {
  const { search } = window.location;
  const appState = store.getState();
  const provider = getAccountProvider();
  const address = addressSelector(appState);
  const loggedIn = isLoggedInSelector(appState);
  const walletLogin = walletLoginSelector(appState);

  if (!provider) {
    throw 'provider not initialized';
  }

  if (getIsProviderEqualTo(LoginMethodsEnum.ledger) && loggedIn) {
    return new Promise((resolve) => {
      resolve(address);
    });
  }

  return !getIsProviderEqualTo(LoginMethodsEnum.none) &&
    !getIsProviderEqualTo(LoginMethodsEnum.wallet) &&
    !getIsProviderEqualTo(LoginMethodsEnum.extra)
    ? // TODO: does not take into account ledger locked see link for details:
      // https://github.com/ElrondNetwork/dapp/blob/d5c57695a10055f20d387ba064b6843606789ee9/src/helpers/accountMethods.tsx#L21
      provider.getAddress()
    : new Promise((resolve) => {
        if (walletLogin != null) {
          const urlSearchParams = new URLSearchParams(search);
          const params = Object.fromEntries(urlSearchParams as any);
          if (addressIsValid(params.address)) {
            resolve(params.address);
          }
        }
        if (loggedIn) {
          resolve(address);
        }
        resolve('');
      });
}

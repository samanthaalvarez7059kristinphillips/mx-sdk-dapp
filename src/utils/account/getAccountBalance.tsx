import { accountSelector } from 'reduxStore/selectors';
import { store } from 'reduxStore/store';
import { getAccount } from './getAccount';

export async function getAccountBalance(address?: string) {
  let accountAddress = address;
  if (accountAddress == null) {
    const account = accountSelector(store.getState());
    accountAddress = account.address;
  }
  const account = await getAccount(accountAddress);
  if (account == null) {
    throw 'Could not read account, user not logged in';
  }
  return account?.balance;
}

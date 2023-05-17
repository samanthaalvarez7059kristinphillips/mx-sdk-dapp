import { Transaction } from '@multiversx/sdk-core';
import { useSelector } from 'reduxStore/DappProviderContext';
import { addressSelector } from 'reduxStore/selectors';
import { getAccount } from 'utils/account/getAccount';
import { getLatestNonce } from 'utils/account/getLatestNonce';
import { computeTransactionsNonce } from './computeTransactionsNonce';

export const useSetTransactionNonces = () => {
  const address = useSelector(addressSelector);
  return async (transactions: Transaction[]) => {
    const account = await getAccount(address);
    const latestNonce = getLatestNonce(account);
    const transactionsWithIncrementalNonces = computeTransactionsNonce({
      latestNonce,
      transactions
    });
    return transactionsWithIncrementalNonces;
  };
};

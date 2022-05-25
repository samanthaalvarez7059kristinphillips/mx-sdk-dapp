import React from 'react';
import qs from 'qs';
import { dappInitRoute, walletSignSession } from 'constants/index';
import { useDispatch, useSelector } from 'redux/DappProviderContext';
import { networkSelector } from 'redux/selectors';
import { moveTransactionsToSignedState } from 'redux/slices';
import { TransactionBatchStatusesEnum } from 'types/enums';
import { parseTransactionAfterSigning } from 'utils';
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider/out';

export function useParseSignedTransactions() {
  const { search } = window.location;
  const network = useSelector(networkSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (search != null) {
      const searchData = qs.parse(search.replace('?', ''));

      if (searchData && walletSignSession in searchData) {
        const signSessionId: number = (searchData as any)[walletSignSession];
        const signedTransactions = new WalletProvider(
          `${network.walletAddress}${dappInitRoute}`
        ).getTransactionsFromWalletUrl();
        if (signedTransactions.length > 0) {
          dispatch(
            moveTransactionsToSignedState({
              sessionId: signSessionId.toString(),
              status: TransactionBatchStatusesEnum.signed,
              transactions: signedTransactions.map((tx) =>
                parseTransactionAfterSigning(tx)
              )
            })
          );
          history.pushState({}, document.title, '?');
        }
      }
    }
  }, [search]);
}

export default useParseSignedTransactions;

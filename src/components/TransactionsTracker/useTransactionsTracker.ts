import { getTransactionsByHashes as defaultGetTxByHash } from 'apiCalls/transactions';
import { GetTransactionsByHashesType } from 'types';
import {
  useCheckTransactionStatus,
  useGetAccountInfo,
  useRegisterWebsocketListener
} from 'hooks/index';
import { useClosureRef } from './useClosureRef';

export interface TransactionsTrackerType {
  getTransactionsByHash?: GetTransactionsByHashesType;
}

export function useTransactionsTracker(props?: TransactionsTrackerType) {
  const { address } = useGetAccountInfo();
  const checkTransactionStatus = useCheckTransactionStatus();
  const checkTransactionStatusCallback = useClosureRef(checkTransactionStatus);

  const getTransactionsByHash =
    props?.getTransactionsByHash ?? defaultGetTxByHash;

  const onMessage = () => {
    checkTransactionStatusCallback.current({
      shouldRefreshBalance: true,
      getTransactionsByHash
    });
  };

  useRegisterWebsocketListener({
    onMessage,
    address
  });
}

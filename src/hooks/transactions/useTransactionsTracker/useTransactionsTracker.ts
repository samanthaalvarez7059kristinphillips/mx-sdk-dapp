import { useEffect } from 'react';
import { getTransactionsByHashes as defaultGetTxByHash } from 'apiCalls/transactions';
import { TransactionsTrackerType } from 'types/transactionsTracker.types';
import { useRegisterWebsocketListener } from '../../websocketListener';
import { useCheckTransactionStatus } from '../useCheckTransactionStatus';
import { useCheckHangingTransactionsFallback } from './useCheckHangingTransactionsFallback';
import { useCheckTransactionOnWsFailureFallback } from './useCheckTransactionOnWsFailureFallback';

export function useTransactionsTracker(props?: TransactionsTrackerType) {
  const checkTransactionStatus = useCheckTransactionStatus();

  const getTransactionsByHash =
    props?.getTransactionsByHash ?? defaultGetTxByHash;

  const onMessage = () => {
    checkTransactionStatus({
      getTransactionsByHash,
      ...props
    });
  };

  // register ws listener
  useRegisterWebsocketListener(onMessage);

  // Fallbacks
  useCheckTransactionOnWsFailureFallback(props);

  useCheckHangingTransactionsFallback(props);

  useEffect(() => {
    onMessage();
  }, []);
}

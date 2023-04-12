import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getBatchTransactionsStatus } from 'services/transactions/getBatchTransactionsStatus';
import { BatchTransactionStatus, BatchTransactionsWSResponseType } from 'types';
import { useDispatch } from 'reduxStore/DappProviderContext';
import { updateBatchTransactions } from 'reduxStore/slices';
import { useRegisterWebsocketListener } from 'hooks/websocketListener';
import { useUpdateBatch } from './useUpdateBatch';
import { useGetAccount } from 'hooks/account';
import { useGetBatches } from './useGetBatches';
import {
  AVERAGE_TX_DURATION_MS,
  TRANSACTIONS_STATUS_POLLING_INTERVAL
} from 'constants/transactionStatus';

type TrackBatchTransactionsStatusProps = {
  batchId: string | null;
  onSuccess?: (batchId: string | null) => void;
  onFail?: (batchId: string | null, errorMessage?: string) => void;
};

export const useTrackBatchTransactions = ({
  batchId,
  onSuccess,
  onFail
}: TrackBatchTransactionsStatusProps) => {
  const dispatch = useDispatch();
  const stopPollingRef = useRef<boolean>(true);

  const updateBatchTransactionsStatuses = useUpdateBatch();
  const { batches } = useGetBatches();
  const { address } = useGetAccount();

  const batchTransactions = useMemo(() => {
    if (!batchId) {
      return {};
    }

    return batches[batchId] ?? {};
  }, [batchId, batches]);

  const batchStatus = useMemo(() => {
    if (!batchId) {
      return '';
    }

    return batches[batchId]?.status ?? '';
  }, [batchId, batches]);

  const getBatchStatus = useCallback(
    async (id: string) => {
      try {
        return await getBatchTransactionsStatus({
          batchId: id,
          address
        });
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    [address]
  );

  const verifyBatchStatus = useCallback(
    async ({ batchId }: { batchId: string }) => {
      const batchStatus = await getBatchStatus(batchId);

      if (!batchStatus) {
        stopPollingRef.current = true;
        return;
      }

      dispatch(updateBatchTransactions(batchStatus));

      const isBatchSuccessful =
        batchStatus?.status === BatchTransactionStatus.success;
      const isBatchFailed =
        batchStatus?.status === BatchTransactionStatus.invalid ||
        batchStatus?.status === BatchTransactionStatus.dropped;
      const isBatchNotFound =
        Boolean(batchStatus?.statusCode) && Boolean(batchStatus?.message);

      if (isBatchSuccessful) {
        stopPollingRef.current = true;
        onSuccess?.(batchId);
        return;
      }

      if (isBatchFailed) {
        stopPollingRef.current = true;
        onFail?.(
          batchId,
          `Error processing batch transactions. Status: ${batchStatus?.status}`
        );
        return;
      }

      if (isBatchNotFound) {
        stopPollingRef.current = true;
      }
    },
    [getBatchStatus, onSuccess, onFail, stopPollingRef.current]
  );

  const onMessage = useCallback(() => {
    // Do nothing, used for backwards compatibility to avoid breaking changes
    // TODO: Will be removed in the next major release
  }, []);

  const onBatchUpdate = useCallback(
    async (data: BatchTransactionsWSResponseType) => {
      await verifyBatchStatus({ batchId: data.batchId });

      await updateBatchTransactionsStatuses({
        batchId: data.batchId,
        shouldRefreshBalance: true
      });
    },
    [verifyBatchStatus, updateBatchTransactionsStatuses]
  );

  useRegisterWebsocketListener(onMessage, onBatchUpdate);

  useEffect(() => {
    const interval = setTimeout(async () => {
      stopPollingRef.current = false;
    }, TRANSACTIONS_STATUS_POLLING_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [onMessage, stopPollingRef.current]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (stopPollingRef.current || !batchId) {
        return;
      }

      await verifyBatchStatus({ batchId });
      await updateBatchTransactionsStatuses({
        batchId,
        shouldRefreshBalance: true
      });
    }, AVERAGE_TX_DURATION_MS);

    return () => clearInterval(interval);
  }, [batchId, verifyBatchStatus, stopPollingRef.current]);

  return {
    getBatchStatus,
    batchStatus,
    batchTransactions
  };
};

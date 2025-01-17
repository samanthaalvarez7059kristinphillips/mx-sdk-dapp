import { useEffect, useMemo, useRef } from 'react';
import { AVERAGE_TX_DURATION_MS, CROSS_SHARD_ROUNDS } from 'constants/index';
import { useStyles } from 'hocs/useStyles';
import { useGetAccount, useGetTransactionDisplayInfo } from 'hooks';
import { useSelector } from 'reduxStore/DappProviderContext';
import { shardSelector } from 'reduxStore/selectors';
import { getUnixTimestamp } from 'utils/dateTime/getUnixTimestamp';
import { getUnixTimestampWithAddedMilliseconds } from 'utils/dateTime/getUnixTimestampWithAddedMilliseconds';
import { getAreTransactionsOnSameShard } from 'utils/transactions/getAreTransactionsOnSameShard';
import {
  getIsTransactionFailed,
  getIsTransactionPending,
  getIsTransactionSuccessful,
  getIsTransactionTimedOut
} from 'utils/transactions/transactionStateByStatus';
import { TransactionToastDefaultProps } from '../transactionToast.type';
import { getToastDataStateByStatus } from '../utils';

export const useTransactionToast = ({
  toastId,
  transactions,
  status,
  lifetimeAfterSuccess,
  startTimestamp,
  endTimeProgress,
  onDelete
}: TransactionToastDefaultProps) => {
  const { styles } = useStyles({
    ssrImportCallback: () =>
      import(
        'UI/TransactionsToastList/components/TransactionToast/transactionToast.styles.scss'
      ),
    clientImportCallback: () =>
      require('UI/TransactionsToastList/components/TransactionToast/transactionToast.styles.scss')
        .default
  });

  const transactionDisplayInfo = useGetTransactionDisplayInfo(toastId);
  const accountShard = useSelector(shardSelector);
  const { address } = useGetAccount();
  const lifetimeAfterSuccessTimeoutRef = useRef<NodeJS.Timeout>();
  const areSameShardTransactions = useMemo(
    () => getAreTransactionsOnSameShard(transactions, accountShard),
    [transactions, accountShard]
  );

  const shardAdjustedDuration = areSameShardTransactions
    ? AVERAGE_TX_DURATION_MS
    : CROSS_SHARD_ROUNDS * AVERAGE_TX_DURATION_MS;

  const transactionDuration =
    transactionDisplayInfo?.transactionDuration || shardAdjustedDuration;

  const [startTime, endTime] = useMemo(() => {
    const startTime = startTimestamp || getUnixTimestamp();
    const endTime =
      endTimeProgress ||
      getUnixTimestampWithAddedMilliseconds(transactionDuration);

    return [startTime, endTime];
  }, []);

  const progress = {
    startTime,
    endTime
  };

  const isPending = getIsTransactionPending(status);
  const isFailed = getIsTransactionFailed(status);
  const isSuccess = getIsTransactionSuccessful(status);
  const isTimedOut = getIsTransactionTimedOut(status);
  const isCompleted = isFailed || isSuccess || isTimedOut;

  const toastDataState = getToastDataStateByStatus({
    address,
    classes: styles ?? {},
    sender: transactions?.[0].sender || address,
    status,
    toastId,
    transactionDisplayInfo
  });

  const handleDeleteToast = () => {
    onDelete?.(toastId);
  };

  useEffect(() => {
    if (
      !isCompleted ||
      !lifetimeAfterSuccess ||
      lifetimeAfterSuccessTimeoutRef.current
    ) {
      return;
    }

    lifetimeAfterSuccessTimeoutRef.current = setTimeout(() => {
      handleDeleteToast();
    }, lifetimeAfterSuccess);

    return () => {
      if (lifetimeAfterSuccessTimeoutRef.current) {
        // Clear timer on unmount and also delete the toast
        // The toast may have been removed before the timer finished by the re-rendering
        // of the toasts list during another toast removal from the store
        handleDeleteToast();
        clearTimeout(lifetimeAfterSuccessTimeoutRef.current);
      }
    };
  }, [lifetimeAfterSuccess, isCompleted]);

  return {
    isCrossShard: !areSameShardTransactions,
    progress,
    isPending,
    isTimedOut,
    toastDataState,
    handleDeleteToast
  };
};

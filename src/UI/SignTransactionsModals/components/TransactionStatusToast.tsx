import React, { useEffect, useMemo } from 'react';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { StatusMessageComponent } from 'components/TransactionStatusToast/StatusMessageComponent';
import { StatusIconType } from 'components/TransactionStatusToast/transactionStatusToast.types';
import {
  CANCEL_TRANSACTION_TOAST_DEFAULT_DURATION,
  CANCEL_TRANSACTION_TOAST_ID,
  DEFAULT_TRANSACTION_STATUS_MESSAGE
} from 'constants/index';
import { useSelector } from 'reduxStore/DappProviderContext';
import { dappConfigSelector } from 'reduxStore/selectors';
import { addNewCustomToast } from 'utils/toasts/customToastsActions';
import { WithClassnameType } from '../../types';

// TODO: Rename to "TransactionStatusToastPropsType" when sdk-dapp@3.0.0
export interface TransactionStatusToastType extends WithClassnameType {
  signError: string | null;
  canceledTransactionsMessage: string | null;
  onDelete?: () => void;
}

export const TransactionStatusToast = ({
  signError,
  canceledTransactionsMessage,
  onDelete
}: TransactionStatusToastType) => {
  const dappConfig = useSelector(dappConfigSelector);

  const message = useMemo(() => {
    return (
      signError ||
      canceledTransactionsMessage ||
      DEFAULT_TRANSACTION_STATUS_MESSAGE
    );
  }, [signError, canceledTransactionsMessage]);

  const type = useMemo(() => {
    if (signError) {
      return StatusIconType.ERROR;
    } else if (canceledTransactionsMessage) {
      return StatusIconType.WARNING;
    }

    return StatusIconType.INFO;
  }, [signError, canceledTransactionsMessage]);

  useEffect(() => {
    addNewCustomToast({
      toastId: `${CANCEL_TRANSACTION_TOAST_ID}-${Date.now()}`,
      title: 'Transaction canceled',
      duration:
        dappConfig.cancelTransactionToastDuration ??
        CANCEL_TRANSACTION_TOAST_DEFAULT_DURATION,
      component: () => <StatusMessageComponent type={type} message={message} />,
      onClose: () => onDelete?.(),
      icon: faWarning
    });
  }, []);

  return null;
};

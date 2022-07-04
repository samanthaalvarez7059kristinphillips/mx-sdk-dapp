import {
  faCheck,
  faHourglass,
  faTimes,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
  TransactionBatchStatusesEnum,
  TransactionsDefaultTitles,
  TransactionsDisplayInfoType
} from 'types';

export type ToastDataState = {
  id: string;
  icon: IconDefinition;
  hasCloseButton: boolean;
  title: string;
  iconClassName: string;
  expires?: number | boolean;
};

interface GetToastsOptionsDataPropsType {
  status?: TransactionBatchStatusesEnum;
  toastId: string;
  style: any;
  transactionDisplayInfo: TransactionsDisplayInfoType;
}

export const getToastDataStateByStatus = ({
  status,
  toastId,
  style,
  transactionDisplayInfo
}: GetToastsOptionsDataPropsType) => {
  const successToastData: ToastDataState = {
    id: toastId,
    icon: faCheck,
    expires: 30000,
    hasCloseButton: true,
    title:
      transactionDisplayInfo?.successMessage ??
      TransactionsDefaultTitles.success,
    iconClassName: style.success
  };

  const pendingToastData: ToastDataState = {
    id: toastId,
    expires: false,
    icon: faHourglass,
    hasCloseButton: false,
    title:
      transactionDisplayInfo?.processingMessage ??
      TransactionsDefaultTitles.pending,
    iconClassName: style.warning
  };

  const failToastData: ToastDataState = {
    id: toastId,
    icon: faTimes,
    title:
      transactionDisplayInfo?.errorMessage ?? TransactionsDefaultTitles.failed,
    hasCloseButton: true,
    iconClassName: style.danger
  };

  const timedOutToastData = {
    id: toastId,
    icon: faTimes,
    title:
      transactionDisplayInfo?.timedOutMessage ??
      TransactionsDefaultTitles.timedOut,
    hasCloseButton: true,
    iconClassName: style.warning
  };

  switch (status) {
    case TransactionBatchStatusesEnum.signed:
    case TransactionBatchStatusesEnum.sent:
      return pendingToastData;
    case TransactionBatchStatusesEnum.success:
      return successToastData;
    case TransactionBatchStatusesEnum.cancelled:
    case TransactionBatchStatusesEnum.fail:
      return failToastData;
    case TransactionBatchStatusesEnum.timedOut:
      return timedOutToastData;
    default:
      return pendingToastData;
  }
};

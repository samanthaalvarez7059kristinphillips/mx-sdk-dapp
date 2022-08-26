import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import globalStyles from 'assets/sass/main.scss';
import { SignedTransactionType } from 'types';
import { TransactionDetails } from 'UI/TransactionDetails';
import { DefaultToastDeleteButton } from './DefaultToastDeleteButton';
import styles from './styles.scss';
import { TransactionToastContentElementsProps } from './transactionToast.type';
import { ToastDataState } from './utils';

export type TransactionToastContentProps = {
  style: Record<string, string>;
  toastDataState: ToastDataState;
  transactions: SignedTransactionType[];
  showCloseButton?: boolean;
  onDeleteToast?: () => void;
  toastTitle?: string | React.ReactNode;
  isTimedOut?: boolean;
  customElements?: TransactionToastContentElementsProps;
};

export const TransactionToastContent: React.FC<TransactionToastContentProps> = ({
  style,
  toastDataState,
  transactions,
  showCloseButton,
  onDeleteToast,
  toastTitle,
  isTimedOut,
  customElements = {
    CustomCloseButton: DefaultToastDeleteButton,
    TransactionToastStatusIcon: FontAwesomeIcon,
    TransactionDetails: TransactionDetails
  }
}) => {
  const TransactionDetails = customElements?.TransactionDetails;
  const TransactionToastStatusIcon = customElements?.TransactionToastStatusIcon;
  const CustomCloseButton = customElements?.CustomCloseButton;

  return (
    <div className={style.content}>
      <div className={style.left}>
        <div className={classNames(style.icon, toastDataState.iconClassName)}>
          {TransactionToastStatusIcon && (
            <TransactionToastStatusIcon
              size='5x'
              icon={toastDataState.icon}
              className={style.svg}
            />
          )}
        </div>
      </div>

      <div className={style.right}>
        <div className={style.heading}>
          <h5 className={classNames([globalStyles.h5, style.mb4])}>
            {toastDataState.title}
          </h5>
          {showCloseButton && CustomCloseButton && (
            <CustomCloseButton
              className={styles.close}
              onClick={onDeleteToast}
            />
          )}
        </div>

        <div className={style.footer}>
          {TransactionDetails && (
            <TransactionDetails
              {...{
                transactions,
                title: toastTitle,
                isTimedOut
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

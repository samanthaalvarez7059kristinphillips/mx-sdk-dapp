import React from 'react';
import classNames from 'classnames';

import globalStyles from 'assets/sass/main.scss';
import { getVisibleOperations } from 'utils/transactions/transactionInfoHelpers/getVisibleOperations';

import {
  WithClassnameType,
  WithTransactionType
} from '../../../../../UI/types';
import { DetailItem } from '../../DetailItem';
import { OperationsList } from '../../OperationsList/OperationList';

export const TransactionInfoTokenOperations = ({
  className,
  transaction
}: WithTransactionType & WithClassnameType) => {
  const visibleOperations = getVisibleOperations(transaction);
  const showOperations = visibleOperations.length > 0;

  if (!showOperations) {
    return null;
  }

  return (
    <DetailItem
      className={className}
      title={
        <>
          <span className={globalStyles.mr2}>Token Operations</span>

          <span
            className={classNames(
              globalStyles.badge,
              globalStyles.badgeSecondary,
              globalStyles.badgePill,
              globalStyles.fontWeightLight
            )}
          >
            {visibleOperations.length}
          </span>
        </>
      }
    >
      <OperationsList
        transaction={transaction}
        operations={visibleOperations}
      />
    </DetailItem>
  );
};

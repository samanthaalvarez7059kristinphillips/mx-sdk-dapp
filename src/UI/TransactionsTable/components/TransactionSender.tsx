import React from 'react';
import classNames from 'classnames';

import globalStyles from 'assets/sass/main.scss';
import { DataTestIdsEnum } from 'constants/index';
import { TransactionDirectionEnum } from 'types/serverTransactions.types';
import { ExplorerLink } from 'UI/ExplorerLink';
import { WithTransactionType } from 'UI/types';
import { addressIsValid } from 'utils/account/addressIsValid';

import { AccountName } from './AccountName';
import { LockedTokenAddressIcon } from './LockedTokenAddressIcon';
import { ScAddressIcon } from './ScAddressIcon';
import { ShardSpan } from './ShardSpan';

import styles from './transactionsTable.styles.scss';

export interface TransactionSenderPropsType extends WithTransactionType {
  showLockedAccounts?: boolean;
}

export const TransactionSender = ({
  transaction,
  showLockedAccounts
}: TransactionSenderPropsType) => {
  const directionOut =
    transaction.transactionDetails.direction === TransactionDirectionEnum.OUT;

  return (
    <div
      className={classNames(
        globalStyles.dFlex,
        globalStyles.alignItemsCenter,
        styles.transactionCell
      )}
      data-testid={DataTestIdsEnum.transactionSender}
    >
      {showLockedAccounts && (
        <LockedTokenAddressIcon
          address={transaction.sender}
          tokenId={transaction.tokenIdentifier ?? ''}
        />
      )}

      <ScAddressIcon initiator={transaction.sender} />

      {directionOut ? (
        <div
          className={classNames(
            globalStyles.w100,
            styles.transactionCellOverflow,
            styles.transactionCellMargin
          )}
        >
          <AccountName
            address={transaction.sender}
            assets={transaction.senderAssets}
          />
        </div>
      ) : addressIsValid(transaction.sender) ? (
        <ExplorerLink
          page={transaction.links.senderLink ?? ''}
          data-testid={DataTestIdsEnum.senderLink}
          className={classNames(
            globalStyles.w100,
            styles.transactionCellOverflow,
            styles.transactionCellMargin,
            styles.transactionCellLink
          )}
        >
          <AccountName
            address={transaction.sender}
            assets={transaction.senderAssets}
          />
        </ExplorerLink>
      ) : (
        <ShardSpan shard={transaction.sender} />
      )}
    </div>
  );
};

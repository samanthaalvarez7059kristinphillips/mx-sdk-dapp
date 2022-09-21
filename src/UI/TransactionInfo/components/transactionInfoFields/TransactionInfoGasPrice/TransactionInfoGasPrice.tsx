import React from 'react';
import { N_A } from 'constants/index';
import { InterpretedTransactionType } from 'types/serverTransactions.types';
import { FormatAmount } from 'UI/FormatAmount/FormatAmount';
import { DetailItem } from '../../DetailItem';

export const TransactionInfoGasUsed = ({
  transaction
}: {
  transaction: InterpretedTransactionType;
}) => {
  return (
    <DetailItem title='Gas Price'>
      {transaction.gasPrice != null ? (
        <FormatAmount
          value={transaction.gasPrice.toString()}
          showLastNonZeroDecimal
        />
      ) : (
        <span className='text-secondary'>{N_A}</span>
      )}
    </DetailItem>
  );
};

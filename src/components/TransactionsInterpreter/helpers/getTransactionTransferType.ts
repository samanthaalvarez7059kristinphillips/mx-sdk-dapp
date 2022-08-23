import {
  TransferTypeEnum,
  ServerTransactionType
} from 'types/server-transactions';
import { TransactionDirection } from './types';

export function getTransactionTransferType(
  address: string,
  transaction: ServerTransactionType,
  receiver: string
): TransactionDirection {
  const directionOut = address === transaction.sender;
  const directionIn = address === receiver;
  const directionSelf = directionOut && directionIn;
  const isScResult = transaction?.type === TransferTypeEnum.SmartContractResult;

  switch (true) {
    case isScResult:
      return TransactionDirection.INTERNAL;
    case directionSelf:
      return TransactionDirection.SELF;
    case directionIn:
      return TransactionDirection.IN;
    case directionOut:
    default:
      return TransactionDirection.OUT;
  }
}

import { newTransaction } from 'models';
import { RawTransactionType } from 'types';

export function getIsTransaction<T>(transaction: T) {
  try {
    const rawTransaction = transaction as unknown as RawTransactionType;
    const validTransaction = newTransaction({
      ...rawTransaction,
      // API transactions do not have chainID
      chainID: rawTransaction.chainID ?? 'D'
    });
    return Boolean(validTransaction);
  } catch (err) {
    return false;
  }
}

import {
  updateSignedTransactions,
  updateSignedTransactionStatus
} from 'reduxStore/slices';
import { store } from 'reduxStore/store';
import {
  TransactionBatchStatusesEnum,
  TransactionServerStatusesEnum
} from 'types/enums';
import { SmartContractResult } from 'types';

export function manageFailedTransactions({
  results,
  hash,
  sessionId
}: {
  results: SmartContractResult[];
  hash: string;
  sessionId: string;
}) {
  const resultWithError = results?.find(
    (scResult) => scResult?.returnMessage !== ''
  );

  store.dispatch(
    updateSignedTransactionStatus({
      transactionHash: hash,
      sessionId,
      status: TransactionServerStatusesEnum.fail,
      errorMessage: resultWithError?.returnMessage
    })
  );
  store.dispatch(
    updateSignedTransactions({
      sessionId,
      status: TransactionBatchStatusesEnum.fail,
      errorMessage: resultWithError?.returnMessage
    })
  );
}

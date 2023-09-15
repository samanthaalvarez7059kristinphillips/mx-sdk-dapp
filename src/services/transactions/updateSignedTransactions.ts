import {
  updateSignedTransactions,
  moveTransactionsToSignedState,
  UpdateSignedTransactionsPayloadType,
  updateSignedTransactionStatus,
  UpdateSignedTransactionStatusPayloadType,
  MoveTransactionsToSignedStatePayloadType,
  setTransactionsDisplayInfo,
  SetTransactionsInfoPayloadType,
  updateSignedTransactionsCustomTransactionInformation
} from 'reduxStore/slices';
import { store } from 'reduxStore/store';
import { CustomTransactionInformation } from 'types';

export function setTransactionsToSignedState(
  payload: MoveTransactionsToSignedStatePayloadType
) {
  store.dispatch(moveTransactionsToSignedState(payload));
}

export function updateSignedTransactionsState(
  payload: UpdateSignedTransactionsPayloadType
) {
  store.dispatch(updateSignedTransactions(payload));
}

export function updateSignedTransactionStatusState(
  payload: UpdateSignedTransactionStatusPayloadType
) {
  store.dispatch(updateSignedTransactionStatus(payload));
}

export function setTransactionsDisplayInfoState(
  payload: SetTransactionsInfoPayloadType
) {
  store.dispatch(setTransactionsDisplayInfo(payload));
}

export function updateSignedTransactionsCustomTransactionInformationState(payload: {
  sessionId: string;
  customTransactionInformationOverrides: Partial<CustomTransactionInformation>;
}) {
  store.dispatch(updateSignedTransactionsCustomTransactionInformation(payload));
}

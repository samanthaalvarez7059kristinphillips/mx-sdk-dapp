import * as React from "react";
import { useContext as useDappContext } from "@elrondnetwork/dapp";
import { Transaction } from "@elrondnetwork/erdjs";
import { faHourglass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PageState from "components/PageState";
import { transactionStatuses } from "helpers/constants";
import { updateSignStatus } from "redux/slices/transactionsSlice";
import { HandleCloseType } from "../helpers";

export interface SignStepType {
  handleClose: (props?: HandleCloseType) => void;
  error: string;
  transaction: Transaction;
  callbackRoute: string;
  sessionId: string;
  index: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
  signedTransactions?: Record<number, Transaction>;
  setSignedTransactions: React.Dispatch<
    React.SetStateAction<Record<number, Transaction> | undefined>
  >;
}

const SignStep = ({
  handleClose,
  error,
  transaction,
  index,
  sessionId,
  isLast,
  setSignedTransactions,
  signedTransactions,
  currentStep,
  setCurrentStep,
  callbackRoute,
}: SignStepType) => {
  const history = useHistory();
  const [waitingForDevice, setWaitingForDevice] = React.useState(false);
  const dispatch = useDispatch();
  const {
    dapp: { provider },
  } = useDappContext();

  const reset = () => {
    setCurrentStep(0);
    setSignedTransactions(undefined);
    setWaitingForDevice(false);
    updateSignStatus({});
  };

  const sign = async () => {
    try {
      setWaitingForDevice(true);
      const tx = await provider.signTransaction(transaction);
      const newSignedTx = { [index]: tx };
      const newSignedTransactions = signedTransactions
        ? { ...signedTransactions, ...newSignedTx }
        : newSignedTx;
      setSignedTransactions(newSignedTransactions);
      if (!isLast) {
        setCurrentStep((exising) => exising + 1);
      } else if (newSignedTransactions) {
        handleClose({ updateBatchStatus: false });

        dispatch(
          updateSignStatus({
            [sessionId]: {
              status: transactionStatuses.signed,
              transactions: Object.values(newSignedTransactions).map(
                (txEntry) => txEntry.toPlainObject(),
              ),
            },
          }),
        );
        reset();
        history.push(callbackRoute);
      }
    } catch (err) {
      console.error(err, "sign error");
      reset();
      handleClose({ updateBatchStatus: false });
    }
  };

  let signBtnLabel = "Sign & Continue";
  signBtnLabel = waitingForDevice ? "Check your Ledger" : signBtnLabel;
  signBtnLabel = isLast && !waitingForDevice ? "Sign & Submit" : signBtnLabel;

  const isFirst = currentStep === 0;

  const close = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFirst) {
      handleClose();
      history.push(callbackRoute);
    } else {
      setCurrentStep((existing) => existing - 1);
    }
  };

  const isVisible = currentStep === index;

  return isVisible ? (
    <PageState
      icon={error ? faTimes : faHourglass}
      iconClass="text-white"
      iconBgClass={error ? "bg-danger" : "bg-warning"}
      iconSize="3x"
      title="Confirm on Ledger"
      description={
        transaction && (
          <React.Fragment>
            <div
              className="form-group text-left"
              data-testid="transactionTitle"
            >
              <span className="form-label">To: </span>
              {transaction.getReceiver().toString()}
            </div>
            <div className="form-group text-left">
              <span className="form-label"> Data:</span>
              {transaction.getData() != null && (
                <textarea
                  readOnly
                  className="form-control overflow-x-hidden"
                  value={transaction.getData().toString()}
                />
              )}
            </div>
            {error && (
              <p className="text-danger d-flex justify-content-center align-items-center">
                {error}
              </p>
            )}

            <div className="d-flex align-items-center flex-column mt-spacer">
              {error && <p className="text-danger">{error}</p>}
              <button
                type="button"
                className="btn btn-primary px-spacer"
                id="signBtn"
                data-testid="signBtn"
                onClick={sign}
                disabled={waitingForDevice}
              >
                {signBtnLabel}
              </button>
              <a
                href="/"
                id="closeButton"
                data-testid="closeButton"
                onClick={close}
                className="btn btn-close-link mt-2"
              >
                {isFirst ? "Cancel" : "Back"}
              </a>
            </div>
          </React.Fragment>
        )
      }
    />
  ) : null;
};

export default SignStep;

import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { CANCEL_ACTION_NAME, DataTestIdsEnum } from 'constants/index';
import { withStyles, WithStylesImportType } from 'hocs/withStyles';
import { useGetAccountProvider } from 'hooks/account/useGetAccountProvider';
import { useClearTransactionsToSignWithWarning } from 'hooks/transactions/helpers/useClearTransactionsToSignWithWarning';
import { useCancelWalletConnectAction } from 'hooks/transactions/useCancelWalletConnectAction';
import { getProviderType } from 'providers/utils';
import { SignModalPropsType } from 'types';
import { LoginMethodsEnum } from 'types/enums.types';
import { ModalContainer } from 'UI/ModalContainer/ModalContainer';
import { PageState } from 'UI/PageState';
import { WalletConnectConnectionStatus } from 'UI/walletConnect/WalletConnectConnectionStatus';

const SignWithWalletConnectModalComponent = ({
  error,
  handleClose,
  transactions,
  sessionId,
  className = 'dapp-wallet-connect-modal',
  modalContentClassName,
  globalStyles,
  styles
}: SignModalPropsType & WithStylesImportType) => {
  const clearTransactionsToSignWithWarning =
    useClearTransactionsToSignWithWarning();

  const classes = {
    wrapper: classNames(
      styles?.modalContainer,
      styles?.walletConnect,
      className
    ),
    icon: globalStyles?.textWhite,
    closeBtn: classNames(
      globalStyles?.btn,
      globalStyles?.btnCloseLink,
      globalStyles?.btnDark,
      globalStyles?.textWhite,
      globalStyles?.mt2
    )
  };

  const { provider } = useGetAccountProvider();
  const providerType = getProviderType(provider);

  const hasMultipleTransactions = transactions && transactions?.length > 1;
  const isSigningWithWalletConnectV2 =
    providerType === LoginMethodsEnum.walletconnectv2;

  const description = `Check your phone to sign the transaction${
    hasMultipleTransactions ? 's' : ''
  }`;

  const { cancelWalletConnectAction } =
    useCancelWalletConnectAction(CANCEL_ACTION_NAME);

  const close = async () => {
    clearTransactionsToSignWithWarning(sessionId);
    await cancelWalletConnectAction();
    handleClose();
  };

  const Description = () => (
    <>
      {isSigningWithWalletConnectV2 ? (
        <WalletConnectConnectionStatus description={description} />
      ) : (
        description
      )}
    </>
  );

  return (
    <ModalContainer
      onClose={handleClose}
      modalConfig={{
        modalDialogClassName: classes.wrapper
      }}
      visible
    >
      <PageState
        icon={error ? faTimes : null}
        iconClass={classes.icon}
        className={modalContentClassName}
        iconBgClass={error ? globalStyles?.bgDanger : globalStyles?.bgWarning}
        iconSize='3x'
        title='Confirm on the xPortal App'
        description={error ? error : <Description />}
        action={
          <button
            id='closeButton'
            data-testid={DataTestIdsEnum.closeButton}
            onClick={close}
            className={classes.closeBtn}
          >
            Cancel
          </button>
        }
      />
    </ModalContainer>
  );
};

export const SignWithWalletConnectModal = withStyles(
  SignWithWalletConnectModalComponent,
  {
    ssrStyles: () =>
      import(
        'UI/SignTransactionsModals/SignWithWalletConnectModal/signWithWalletConnectModalStyles.scss'
      ),
    clientStyles: () =>
      require('UI/SignTransactionsModals/SignWithWalletConnectModal/signWithWalletConnectModalStyles.scss')
        .default
  }
);

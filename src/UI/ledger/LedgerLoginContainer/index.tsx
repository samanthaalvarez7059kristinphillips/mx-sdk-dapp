import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import globalStyles from 'assets/sass/main.scss';
import { useGetAccountInfo } from 'hooks/account/useGetAccountInfo';
import { useLedgerLogin } from 'hooks/login/useLedgerLogin';
import { ModalContainer } from 'UI/ModalContainer';
import { PageState } from 'UI/PageState';
import { AddressTable } from './AddressTable';
import { ConfirmAddress } from './ConfirmAddress';
import { LedgerConnect } from './LedgerConnect';
import { WithClassname } from 'UI/types/with-classname';

const ledgerWaitingText = 'Waiting for device';

interface LedgerLoginContainerPropsType extends WithClassname {
  callbackRoute?: string;
  wrapContentInsideModal?: boolean;
  token?: string;
  onClose?: () => void;
  onLoginRedirect?: (callbackRoute: string) => void;
}

export const LedgerLoginContainer = ({
  callbackRoute,
  className = 'dapp-ledger-login-container',
  wrapContentInsideModal = true,
  onClose,
  onLoginRedirect,
  token
}: LedgerLoginContainerPropsType) => {
  const classes = {
    spinner: `fa-spin ${globalStyles.textPrimary}`
  };
  const { ledgerAccount } = useGetAccountInfo();
  const [
    onStartLogin,
    { error, isLoading },
    {
      showAddressList,
      accounts,
      onGoToPrevPage,
      onGoToNextPage,
      onSelectAddress,
      onConfirmSelectedAddress,
      startIndex,
      selectedAddress
    }
  ] = useLedgerLogin({ callbackRoute, token, onLoginRedirect });

  function getContent() {
    if (isLoading) {
      return (
        <PageState
          icon={faCircleNotch}
          iconClass={classes.spinner}
          title={ledgerWaitingText}
        />
      );
    }
    if (ledgerAccount != null && !error) {
      return <ConfirmAddress token={token} />;
    }

    if (showAddressList && !error) {
      return (
        <AddressTable
          accounts={accounts}
          loading={isLoading}
          onGoToNextPage={onGoToNextPage}
          onGoToPrevPage={onGoToPrevPage}
          onSelectAddress={onSelectAddress}
          startIndex={startIndex}
          selectedAddress={selectedAddress?.address}
          onConfirmSelectedAddress={onConfirmSelectedAddress}
        />
      );
    }

    return <LedgerConnect onClick={onStartLogin} error={error} />;
  }

  return wrapContentInsideModal ? (
    <ModalContainer
      onClose={onClose}
      modalConfig={{
        headerText: 'Login with ledger',
        showHeader: true,
        modalDialogClassName: className
      }}
    >
      {getContent()}
    </ModalContainer>
  ) : (
    getContent()
  );
};

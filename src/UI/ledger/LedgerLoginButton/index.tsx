import React, { ReactNode, useState } from 'react';
import { useDappModal } from 'UI/DappModal';
import { LoginButton } from 'UI/LoginButton/LoginButton';
import { LedgerLoginContainer } from '../LedgerLoginContainer';
import { WithClassname } from 'UI/types/with-classname';

export interface LedgerLoginButtonPropsType extends WithClassname {
  token?: string;
  onModalOpens?: (props?: any) => void;
  onModalCloses?: (props?: any) => void;
  children?: ReactNode;
  modalClassName?: string;
  buttonClassName?: string;
  callbackRoute?: string;
  loginButtonText?: string;
  wrapContentInsideModal?: boolean;
  hideButtonWhenModalOpens?: boolean;
  onLoginRedirect?: (callbackRoute: string) => void;
  disabled?: boolean;
}

export const LedgerLoginButton: (
  props: LedgerLoginButtonPropsType
) => JSX.Element = ({
  token,
  callbackRoute,
  children,
  onModalOpens,
  onModalCloses,
  loginButtonText = 'Ledger',
  buttonClassName = 'dapp-ledger-login-button',
  className = 'dapp-ledger-login',
  modalClassName,
  wrapContentInsideModal = true,
  hideButtonWhenModalOpens = false,
  onLoginRedirect,
  disabled
}) => {
  const [canShowLoginModal, setCanShowLoginModal] = useState(false);
  const { handleShowModal, handleHideModal } = useDappModal();

  function handleOpenModal() {
    setCanShowLoginModal(true);
    handleShowModal();
    onModalOpens?.();
  }

  function handleCloseModal() {
    setCanShowLoginModal(false);
    handleHideModal();
    onModalCloses?.();
  }

  const shouldRenderButton = !hideButtonWhenModalOpens || !canShowLoginModal;

  return (
    <>
      {shouldRenderButton && (
        <LoginButton
          onLogin={handleOpenModal}
          className={className}
          btnClassName={buttonClassName}
          text={loginButtonText}
          disabled={disabled}
        >
          {children}
        </LoginButton>
      )}
      {canShowLoginModal && (
        <LedgerLoginContainer
          className={modalClassName}
          callbackRoute={callbackRoute}
          token={token}
          wrapContentInsideModal={wrapContentInsideModal}
          onClose={handleCloseModal}
          onLoginRedirect={onLoginRedirect}
        />
      )}
    </>
  );
};

import React from 'react';

import classNames from 'optionalPackages/classnames';
import icons from 'optionalPackages/fortawesome-free-solid-svg-icons';
import ReactBootstrap from 'optionalPackages/react-bootstrap';
import { SignModalPropsType } from 'types';
import PageState from 'UI/PageState';
import { getGeneratedClasses, wrapperClassName, safeRedirect } from 'utils';

export const SignWithWalletConnectModal = ({
  error,
  handleClose,
  callbackRoute,
  transactions,
  className = 'wallet-connect-modal'
}: SignModalPropsType) => {
  const classes = getGeneratedClasses(className, true, {
    wrapper: 'modal-container wallet-connect',
    icon: 'text-white',
    closeBtn: 'btn btn-close-link mt-2'
  });

  const hasMultipleTransactions = transactions && transactions?.length > 1;
  const description = error
    ? error
    : `Check your phone to sign the transaction${
        hasMultipleTransactions ? 's' : ''
      }`;

  const close = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
    if (
      callbackRoute != null &&
      !window.location.pathname.includes(callbackRoute)
    ) {
      safeRedirect(callbackRoute);
    }
  };
  return (
    <ReactBootstrap.Modal
      show
      backdrop='static'
      onHide={close}
      className={classNames(classes.wrapper, wrapperClassName)}
      animation={false}
      centered
    >
      <PageState
        icon={error ? icons.faTimes : icons.faHourglass}
        iconClass={classes.icon}
        className={className}
        iconBgClass={error ? 'bg-danger' : 'bg-warning'}
        iconSize='3x'
        title='Confirm on Maiar'
        description={description}
        action={
          <button
            id='closeButton'
            data-testid='closeButton'
            onClick={close}
            className={classes.closeBtn}
          >
            Close
          </button>
        }
      />
    </ReactBootstrap.Modal>
  );
};

export default SignWithWalletConnectModal;

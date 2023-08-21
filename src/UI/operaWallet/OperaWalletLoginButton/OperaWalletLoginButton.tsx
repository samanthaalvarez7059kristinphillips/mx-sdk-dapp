import React, { ReactNode } from 'react';
import { DataTestIdsEnum } from 'constants/index';
import { useOperaLogin } from 'hooks';
import { getIsNativeAuthSingingForbidden } from 'services/nativeAuth/helpers';
import { LoginButton } from 'UI/LoginButton/LoginButton';
import { OnProviderLoginType } from '../../../types';
import { WithClassnameType } from '../../types';
import { getIsOperaWalletAvailable } from '../helpers';

export interface OperaWalletLoginButtonPropsType
  extends WithClassnameType,
    OnProviderLoginType {
  children?: ReactNode;
  buttonClassName?: string;
  loginButtonText?: string;
  disabled?: boolean;
}

const isOperaWalletAvailable = getIsOperaWalletAvailable();

export const OperaWalletLoginButton: (
  props: OperaWalletLoginButtonPropsType
) => JSX.Element = ({
  token,
  className = 'dapp-opera-login',
  children,
  callbackRoute,
  buttonClassName,
  nativeAuth,
  loginButtonText = 'Opera Crypto Wallet',
  onLoginRedirect,
  disabled,
  'data-testid': dataTestId = DataTestIdsEnum.operaLoginButton
}) => {
  const disabledConnectButton = getIsNativeAuthSingingForbidden(token);
  const [onInitiateLogin] = useOperaLogin({
    callbackRoute,
    token,
    onLoginRedirect,
    nativeAuth
  });

  const handleLogin = () => {
    onInitiateLogin();
  };

  return !isOperaWalletAvailable ? (
    <></>
  ) : (
    <LoginButton
      onLogin={handleLogin}
      className={className}
      btnClassName={buttonClassName}
      text={loginButtonText}
      disabled={disabled || disabledConnectButton}
      data-testid={dataTestId}
    >
      {children}
    </LoginButton>
  );
};

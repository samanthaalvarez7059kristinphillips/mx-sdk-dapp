import React from 'react';
import classNames from 'classnames';
import globalStyles from 'assets/sass/main.scss';
import { WithClassname } from '../types';
import styles from './login-button.scss';

type LoginButtonProps = {
  onLogin: () => void;
  text?: string;
  btnClassName?: string;
  children?: React.ReactNode;
  disabled?: boolean;
} & WithClassname;

export const LoginButton = ({
  onLogin,
  text = 'Default Login Button',
  className = 'dapp-login-button',
  btnClassName = 'dapp-default-login-button',
  disabled,
  children
}: LoginButtonProps) => {
  const classes = {
    wrapper: classNames(
      globalStyles.btn,
      globalStyles.btnPrimary,
      globalStyles.px4,
      globalStyles.m1,
      globalStyles.mx3,
      {
        [btnClassName]: btnClassName != null
      },
      className
    ),
    loginText: styles.loginText,
    wrapperClassName: className
  };

  return (
    <button disabled={disabled} className={classes.wrapper} onClick={onLogin}>
      {children || <span className={classes.loginText}>{text}</span>}
    </button>
  );
};

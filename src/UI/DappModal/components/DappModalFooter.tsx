import React from 'react';
import styles from '../dapp-modal.scss';
import { WithClassname } from 'UI/types/with-classname';
import classNames from 'classnames';

type DappModalFooterProps = {
  visible?: boolean;
  footerText?: string;
  customFooter?: JSX.Element;
} & WithClassname;

export const DappModalFooter: React.FC<DappModalFooterProps> = ({
  visible,
  customFooter,
  className,
  footerText
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={classNames(styles.dappModalFooter, className)}>
      {customFooter ?? <div>{footerText}</div>}
    </div>
  );
};

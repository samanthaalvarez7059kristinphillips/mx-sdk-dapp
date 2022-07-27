import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../dapp-modal.scss';
import globalStyles from 'assets/sass/main.scss';
import { WithClassname } from 'UI/types/with-classname';
import classNames from 'classnames';

type DappModalHeaderProps = {
  visible?: boolean;
  headerText?: string;
  customHeader?: JSX.Element | string;
  closeButtonClassName?: string;
  onHide?: () => void;
} & WithClassname;

export const DappModalHeader: React.FC<DappModalHeaderProps> = ({
  visible,
  headerText,
  customHeader,
  className,
  closeButtonClassName,
  onHide
}) => {
  if (!visible) {
    return null;
  }

  return customHeader ? (
    <div className={classNames(styles.dappModalHeader, className)}>
      {customHeader}
    </div>
  ) : (
    <div className={classNames(styles.dappModalHeader, className)}>
      <div className={styles.dappModalHeaderText}>{headerText}</div>

      <button
        className={`${styles.dappModalCloseButton} ${globalStyles.btn} ${globalStyles.btnLight} ${closeButtonClassName}`}
        onClick={onHide}
      >
        <FontAwesomeIcon size='lg' icon={faTimes} />
      </button>
    </div>
  );
};

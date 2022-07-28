import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import globalStyles from 'assets/sass/main.scss';
import { PageState } from 'UI/PageState';
import { WithClassname } from 'UI/types/with-classname';

export const Loader = ({
  dataTestId = 'loader',
  noText = false,
  className = 'dapp-loader'
}: {
  dataTestId?: string;
  noText?: boolean;
} & WithClassname) => {
  return (
    <PageState
      title={noText ? '' : 'Loading...'}
      iconClass={`fa-spin ${globalStyles.textPrimary}`}
      dataTestId={dataTestId}
      icon={faCircleNotch}
      className={className}
    />
  );
};

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import globalStyles from 'assets/sass/main.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { WithClassname } from 'UI/types/with-classname';

export interface IconStateProps extends WithClassname {
  icon: IconProp;
  iconSize?: '2x' | '3x' | '5x';
}

export const IconState = ({
  icon,
  iconSize = '3x',
  className = 'dapp-icon-state'
}: IconStateProps) => {
  const classes = {
    wrapper: classNames(
      `${globalStyles.iconState} ${globalStyles.mxAuto}`,
      {
        half: iconSize === '2x'
      },
      className
    ),
    icon: globalStyles.textWhite
  };

  return (
    <span className={classes.wrapper}>
      <FontAwesomeIcon icon={icon} size={iconSize} className={classes.icon} />
    </span>
  );
};

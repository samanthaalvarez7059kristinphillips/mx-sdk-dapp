import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { getGeneratedClasses } from 'utils';

import { Props } from './types';

export const PageState = ({
  icon,
  title,
  action,
  iconClass,
  dataTestId,
  description,
  iconBgClass,
  iconSize = '5x',
  className = 'page-state',
  shouldRenderDefaultCss = true
}: Props) => {
  const generatedClasses = getGeneratedClasses(
    className,
    shouldRenderDefaultCss,
    {
      wrapper: 'state m-auto p-4 text-center',
      iconContainer: classNames('icon-state mx-auto', {
        [`${iconBgClass}`]: Boolean(iconBgClass)
      }),
      iconClass: classNames(iconClass != null && iconClass),
      title: 'h4 my-4',
      description: 'mb-3'
    }
  );

  return (
    <div className={generatedClasses.wrapper} data-testid={dataTestId}>
      {icon && (
        <span className={generatedClasses.iconContainer}>
          <FontAwesomeIcon
            icon={icon}
            className={generatedClasses.iconClass}
            size={iconSize}
          />
        </span>
      )}
      {title && <p className={generatedClasses.title}>{title}</p>}
      {description && (
        <div className={generatedClasses.description}>{description}</div>
      )}
      {action && <React.Fragment>{action}</React.Fragment>}
    </div>
  );
};

export default PageState;

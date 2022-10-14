import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { useGetNotification } from 'hooks';
import { NotificationTypesEnum } from 'types';
import { ModalContainer } from '../ModalContainer';
import { PageState } from '../PageState';

import globalStyles from 'assets/sass/main.scss';

const notificationTypesToIcons = {
  [NotificationTypesEnum.warning]: faExclamationTriangle
};
const defaultIcon = faExclamationTriangle;

export function NotificationModal() {
  const { notification, clearNotification } = useGetNotification();

  const onDone = () => {
    clearNotification();
  };

  const type = notification?.type as NotificationTypesEnum.warning;
  const icon = notification
    ? notificationTypesToIcons[type] || defaultIcon
    : null;

  return (
    <ModalContainer onClose={clearNotification} visible={Boolean(notification)}>
      <PageState
        icon={icon}
        iconClass={notification?.iconClassName}
        iconBgClass={classNames(globalStyles.p4, globalStyles.roundedBgCircle)}
        iconSize='3x'
        title={notification?.title}
        description={notification?.description}
        action={
          <button
            className={classNames(globalStyles.btn, globalStyles.btnPrimary)}
            onClick={onDone}
          >
            Done
          </button>
        }
      />
    </ModalContainer>
  );
}

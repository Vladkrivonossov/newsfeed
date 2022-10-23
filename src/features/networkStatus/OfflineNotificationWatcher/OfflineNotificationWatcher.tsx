import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';
import React from 'react';
import { OfflineNotification } from '@components/OfflineNotification/OfflineNotification';
import { CSSTransition } from 'react-transition-group';
import './OnlineNotificationWatcher.css';

export const OfflineNotificationWatcher = () => {
  const { online } = useNetworkStatusContext();
  return (
    <CSSTransition
      in={!online}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="offline-notification-animation"
    >
      <OfflineNotification />
    </CSSTransition>
  );
};

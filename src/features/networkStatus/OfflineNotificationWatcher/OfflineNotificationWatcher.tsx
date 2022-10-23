import { useNetworkStatusContext } from '@features/networkStatus/NetworkStatusContextProvider';

const OnlineNotificationWatcher = () => {
  const { online } = useNetworkStatusContext();
  console.log(online);
};

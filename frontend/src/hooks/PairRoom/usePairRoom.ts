import { useEffect } from 'react';

import useSocketStore from '@/stores/socketStore';
import useToastStore from '@/stores/toastStore';

import { getConnection } from '@/apis/websocket/websocket';

const usePairRoom = () => {
  const { setClient, setIsConnected } = useSocketStore();
  const { addToast } = useToastStore();

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const client = getConnection();

    client.onConnect = () => {
      setClient(client);
      setIsConnected(true);
    };

    client.onDisconnect = () => {
      setClient(null);
      setIsConnected(false);
    };

    client.onStompError = (error) => {
      console.error(error);
      addToast({ status: 'ERROR', message: `웹소켓 연결 과정에서 오류가 발생했습니다. ${error}` });
    };

    client.activate();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      client.deactivate();
      setClient(null);
      setIsConnected(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {};
};

export default usePairRoom;

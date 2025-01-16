import { useEffect, useRef } from 'react';

import { Client } from '@stomp/stompjs';

import useToastStore from '@/stores/toastStore';

import { getConnection } from '@/apis/websocket/websocket';

const usePairRoom = () => {
  const stompClient = useRef<Client | null>(null);

  const { addToast } = useToastStore();

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const client = getConnection();

    client.onConnect = () => {
      stompClient.current = client;
    };

    client.onDisconnect = () => {
      stompClient.current = null;
    };

    client.onStompError = (error) => {
      console.error(error);
      addToast({ status: 'ERROR', message: `웹소켓 연결 과정에서 오류가 발생했습니다. ${error}` });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    client.activate();

    return () => {
      client.deactivate();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { client: stompClient.current };
};

export default usePairRoom;

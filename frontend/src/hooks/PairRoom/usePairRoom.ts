import { useEffect, useRef } from 'react';

import useToastStore from '@/stores/toastStore';

import { getConnection } from '@/apis/websocket/websocket';

const usePairRoom = (accessCode: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  const { addToast } = useToastStore();

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const socket = getConnection(accessCode);

    socket.onopen = () => {
      socketRef.current = socket;
    };

    socket.onerror = (error) => {
      console.error(error);
      addToast({ status: 'ERROR', message: `웹소켓 연결 과정에서 오류가 발생했습니다. ${error}` });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.close();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { socket: socketRef.current };
};

export default usePairRoom;

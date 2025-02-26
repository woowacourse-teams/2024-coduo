import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useSocketStore from '@/stores/socketStore';
import useToastStore from '@/stores/toastStore';

import type { PairRoomStatus } from '@/apis/http/pairRoom';
import { subscribeTopic } from '@/apis/websocket/websocket';

const usePairRoomStatusSocket = (defaultStatus: PairRoomStatus) => {
  const navigate = useNavigate();

  const { client, isConnected, accessCode } = useSocketStore();
  const { addToast } = useToastStore();

  if (defaultStatus === 'COMPLETED') {
    navigate(`/room/${accessCode}/completed`, { state: { valid: true }, replace: true });
  }

  const handleStatus = (status: PairRoomStatus) => {
    if (status === 'COMPLETED') {
      addToast({ status: 'SUCCESS', message: '페어 프로그래밍이 완료되었습니다.' });
      navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
    }
  };

  useEffect(() => {
    if (client && isConnected) {
      subscribeTopic<{ status: PairRoomStatus }>(client, `/topic/${accessCode}/pair-room/status`, (body) =>
        handleStatus(body.status),
      );
    }

    return () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/pair-room/status`);
      }
    };
  }, [client, isConnected]);
};

export default usePairRoomStatusSocket;

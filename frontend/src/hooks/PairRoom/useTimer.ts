import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Client, Message } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { startTimer, stopTimer } from '@/apis/http/timer';

import useNotification from '@/hooks/PairRoom/useNotification';

import { QUERY_KEYS } from '@/constants/queryKeys';

const STATUS = {
  COMPLETE: 'complete',
  START: 'start',
  RUNNING: 'running',
  PAUSE: 'pause',
  UPDATE: 'update',
};

const useTimer = (
  client: Client | null,
  accessCode: string,
  defaultTime: number,
  defaultTimeLeft: number,
  onTimerStop: () => void,
) => {
  const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const alarmAudio = useRef(new Audio(AlarmSound));

  const { addToast } = useToastStore();
  const { fireNotification } = useNotification();

  const handleStart = () => {
    if (!isActive) startTimer(accessCode);
  };

  const handlePause = () => {
    if (isActive) stopTimer(accessCode);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
    onTimerStop();

    alarmAudio.current.play();
    fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꿔 주세요!', {
      requireInteraction: true,
    });

    addToast({ status: 'SUCCESS', message: '타이머가 종료되었습니다.' });
    addToast({ status: 'INFO', message: '드라이버 / 내비게이터 역할을 바꿔 주세요!' });
  };

  const handleTimerEvent = (timeLeft: number) => {
    if (timeLeft === 0) {
      handleStop();
      return;
    }

    setTimeLeft(timeLeft);
  };

  const handleTimerStatusEvent = (status: string) => {
    switch (status) {
      case STATUS.COMPLETE:
        navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
        addToast({ status: 'WARNING', message: '페어룸이 종료되었습니다.' });
        break;

      case STATUS.START:
      case STATUS.RUNNING:
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        break;

      case STATUS.PAUSE:
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        break;

      case STATUS.UPDATE:
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
        addToast({ status: 'WARNING', message: '타이머 시간이 변경되었습니다.' });
        break;

      default:
        addToast({ status: 'ERROR', message: '예상하지 못한 에러가 발생했습니다.' });
    }
  };

  useEffect(() => {
    if (client) {
      client.subscribe(`/topic/${accessCode}/timer`, (message: Message) =>
        handleTimerEvent(JSON.parse(message.body).data),
      );
      client.subscribe(`/topic/${accessCode}/timer/status`, (message: Message) =>
        handleTimerStatusEvent(JSON.parse(message.body).data),
      );
    }

    return () => {
      if (client) {
        client.unsubscribe('/timer');
        client.unsubscribe('/timer/status');
      }
    };
  }, [client]);

  return {
    timeLeft,
    isActive,
    handleStart,
    handlePause,
  };
};

export default useTimer;

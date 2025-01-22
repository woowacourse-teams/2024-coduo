import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { AlarmSound } from '@/assets';

import useSocketStore from '@/stores/socketStore';
import useToastStore from '@/stores/toastStore';

import { startTimer, stopTimer } from '@/apis/http/timer';
import { subscribeTopic } from '@/apis/websocket/websocket';

import useNotification from '@/hooks/PairRoom/useNotification';

import { QUERY_KEYS } from '@/constants/queryKeys';

enum TimerStatus {
  COMPLETE = 'complete',
  START = 'start',
  RUNNING = 'running',
  PAUSE = 'pause',
  UPDATE = 'update',
}

const STATUS = TimerStatus;

const useTimer = (defaultTime: number, defaultTimeLeft: number, onTimerStop: () => void) => {
  const { client, isConnected, accessCode } = useSocketStore();

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

  const handleTimerStatusEvent = (status: TimerStatus) => {
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
    if (client && isConnected) {
      // 타이머 남은 시간
      subscribeTopic<{ data: number }>(client, `/topic/${accessCode}/timer`, (body) => handleTimerEvent(body.data));

      // 타이머 상태
      subscribeTopic<{ data: TimerStatus }>(client, `/topic/${accessCode}/timer/status`, (body) =>
        handleTimerStatusEvent(body.data),
      );
    }

    return () => {
      if (client && isConnected) {
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

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { startTimer, stopTimer } from '@/apis/http/timer';

import useNotification from '@/hooks/PairRoom/useNotification';

import { QUERY_KEYS } from '@/constants/queryKeys';

const TIMER_EVENTS = {
  TIMER: 'timer',
  REMAINING_TIME: 'remaining-time',
};

const TIMER_MESSAGES = {
  COMPLETE: 'complete',
  START: 'start',
  RUNNING: 'running',
  PAUSE: 'pause',
  UPDATE: 'update',
};

const useTimer = (
  socket: WebSocket | null,
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

  const handleTimerEvent = (eventData: string) => {
    switch (eventData) {
      case TIMER_MESSAGES.COMPLETE:
        navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
        addToast({ status: 'WARNING', message: '페어룸이 종료되었습니다.' });
        break;

      case TIMER_MESSAGES.START:
      case TIMER_MESSAGES.RUNNING:
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        break;

      case TIMER_MESSAGES.PAUSE:
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        break;

      case TIMER_MESSAGES.UPDATE:
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
        addToast({ status: 'WARNING', message: '타이머 시간이 변경되었습니다.' });
        break;

      default:
        addToast({ status: 'ERROR', message: '예상하지 못한 에러가 발생했습니다.' });
    }
  };

  const handleRemainingTimeEvent = (eventData: string) => {
    if (eventData === '0') {
      handleStop();
      return;
    }

    setTimeLeft(Number(eventData));
  };

  const handleTimer = (eventName: string, eventData: string) => {
    switch (eventName) {
      case TIMER_EVENTS.TIMER:
        handleTimerEvent(eventData);
        break;

      case TIMER_EVENTS.REMAINING_TIME:
        handleRemainingTimeEvent(eventData);
        break;

      default:
        console.error(`Unhandled event: ${eventName}`);
        addToast({ status: 'ERROR', message: '예상하지 못한 에러가 발생했습니다.' });
    }
  };

  const handleMessage = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);
    handleTimer(parsedData.event, parsedData.data);
  };

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      socket.addEventListener('message', handleMessage as EventListener);
    };

    return () => {
      if (socket) socket.removeEventListener('message', handleMessage as EventListener);
    };
  }, [socket]);

  return {
    timeLeft,
    isActive,
    handleStart,
    handlePause,
  };
};

export default useTimer;

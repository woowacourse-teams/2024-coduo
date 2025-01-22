import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { getConnection, startTimer, stopTimer } from '@/apis/timer';

import useNotification from '@/hooks/PairRoom/useNotification';

import { QUERY_KEYS } from '@/constants/queryKeys';

const EVENT_NAMES = {
  TIMER: 'timer',
  REMAINING_TIME: 'remaining-time',
};

const MESSAGES = {
  COMPLETE: 'complete',
  START: 'start',
  RUNNING: 'running',
  PAUSE: 'pause',
  UPDATE: 'update',
};

const useTimer = (accessCode: string, defaultTime: number, defaultTimeleft: number, onTimerStop: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const alarmAudio = useRef(new Audio(AlarmSound));
  // const timeoutCount = useRef(0);

  const [timeLeft, setTimeLeft] = useState(defaultTimeleft);
  const [isActive, setIsActive] = useState(false);

  const { addToast } = useToastStore();
  const { fireNotification } = useNotification();

  const handleStart = () => {
    if (!isActive) startTimer(accessCode);
  };

  const handlePause = () => {
    stopTimer(accessCode);
  };

  const handleStop = () => {
    addToast({ status: 'SUCCESS', message: '타이머가 종료되었습니다.' });

    setIsActive(false);
    setTimeLeft(defaultTime);
    onTimerStop();

    addToast({ status: 'INFO', message: '드라이버 / 내비게이터 역할을 바꿔 주세요!' });
  };

  const handleEvent = (eventName: string, eventData: string) => {
    switch (eventName) {
      case EVENT_NAMES.TIMER:
        handleTimerEvent(eventData);
        break;
      case EVENT_NAMES.REMAINING_TIME:
        handleRemainingTimeEvent(eventData);
        break;
      default:
        console.warn(`Unhandled event: ${eventName}`);
    }
  };

  const handleTimerEvent = (eventData: string) => {
    switch (eventData) {
      case MESSAGES.COMPLETE:
        navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
        addToast({ status: 'WARNING', message: '페어룸이 종료되었습니다.' });
        break;
      case MESSAGES.START:
      case MESSAGES.RUNNING:
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        break;
      case MESSAGES.PAUSE:
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        break;
      case MESSAGES.UPDATE:
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
        addToast({ status: 'WARNING', message: '타이머 시간이 변경되었습니다.' });
        break;
      default:
        console.warn(`Unhandled timer event data: ${eventData}`);
    }
  };

  const handleRemainingTimeEvent = (eventData: string) => {
    if (eventData === '0') {
      handleStop();
      alarmAudio.current.play();
      fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꿔 주세요!', {
        requireInteraction: true,
      });
    } else {
      setTimeLeft(Number(eventData));
    }
  };

  useEffect(() => {
    const socket = getConnection(accessCode);

    const handleMessage = (event: MessageEvent) => {
      console.log('Received event:', event.data);
      const parsedData = JSON.parse(event.data);
      handleEvent(parsedData.event, parsedData.data);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      socket.addEventListener('message', handleMessage as EventListener);
    };

    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.removeEventListener('message', handleMessage as EventListener);
      socket.close();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { timeLeft, isActive, handleStart, handlePause };
};

export default useTimer;

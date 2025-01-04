import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { getConnection, startTimer, stopTimer } from '@/apis/timer';

import useNotification from '@/hooks/PairRoom/useNotification';

import { QUERY_KEYS } from '@/constants/queryKeys';

const STATUS_KEY = 'timer';
const TIMER_KEY = 'remaining-time';
// const TIMEOUT_LIMIT = 100;

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

  useEffect(() => {
    const socket = getConnection(accessCode);

    const handleStatus = (event: MessageEvent) => {
      const eventName = JSON.parse(event.data).event;
      const eventData = JSON.parse(event.data).data;
      if (eventName == 'timer' && eventData === 'complete') {
        navigate(`/room/${accessCode}/retrospectForm`, { state: { valid: true } });
        addToast({ status: 'WARNING', message: '페어룸이 종료되었습니다.' });
        return;
      }

      if (eventName == 'timer' && eventData === 'start') {
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        return;
      }

      if (eventName == 'timer' && eventData === 'running') {
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 진행 중입니다.' });
        return;
      }

      if (eventName == 'timer' && eventData === 'pause') {
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        return;
      }

      if (eventName == 'timer' && eventData === 'update') {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
        addToast({ status: 'WARNING', message: '타이머 시간이 변경되었습니다.' });
        return;
      }
    };

    const handleTimeLeft = (event: MessageEvent) => {
      const eventName = JSON.parse(event.data).event;
      const eventData = JSON.parse(event.data).data;
      if (eventName == 'remaining-time' && eventData == '0') {
        handleStop();
        alarmAudio.current.play();
        fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꿔 주세요!', {
          requireInteraction: true,
        });
      } else {
        setTimeLeft(eventData);
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    socket.onopen = () => {
      socket.addEventListener(TIMER_KEY, handleTimeLeft as EventListener);
    };

    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };

    socket.addEventListener(STATUS_KEY, handleStatus as EventListener);

    // sse.onerror = () => {
    //   timeoutCount.current += 1;
    //   if (timeoutCount.current >= TIMEOUT_LIMIT) navigate('/error');
    // };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.removeEventListener(TIMER_KEY, handleTimeLeft as EventListener);
      socket.removeEventListener(STATUS_KEY, handleStatus as EventListener);
      socket.close();

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { timeLeft, isActive, handleStart, handlePause };
};

export default useTimer;

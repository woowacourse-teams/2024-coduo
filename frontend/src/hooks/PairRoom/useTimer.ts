import { useRef, useState, useEffect } from 'react';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { getSSEConnection, startTimer, stopTimer } from '@/apis/timer';

import useNotification from '@/hooks/common/useNotification';

const STATUS_SSE_KEY = 'timer';
const TIME_SSE_KEY = 'remaining-time';

const useTimer = (accessCode: string, defaultTime: number, defaultTimeleft: number, onTimerStop: () => void) => {
  const alarmAudio = useRef(new Audio(AlarmSound));

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
    const sse = getSSEConnection(accessCode);

    const handleStatus = (event: MessageEvent) => {
      if (event.data === 'start') {
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
        return;
      }

      if (event.data === 'running') {
        setIsActive(true);
        addToast({ status: 'SUCCESS', message: '타이머가 진행 중입니다.' });
        return;
      }

      if (event.data === 'pause') {
        setIsActive(false);
        addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
        return;
      }
    };

    const handleTimeLeft = (event: MessageEvent) => {
      if (event.data === '0') {
        console.log('타이머 종료');
        handleStop();
        alarmAudio.current.play();
        fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꿔 주세요!', {
          requireInteraction: true,
        });
      } else {
        setTimeLeft(event.data);
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    sse.addEventListener(TIME_SSE_KEY, handleTimeLeft);
    sse.addEventListener(STATUS_SSE_KEY, handleStatus);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      sse.removeEventListener(STATUS_SSE_KEY, handleStatus);
      sse.removeEventListener(TIME_SSE_KEY, handleTimeLeft);
      sse.close();

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { timeLeft, isActive, handleStart, handlePause };
};

export default useTimer;

import { useRef, useState, useEffect } from 'react';

import { AlarmSound } from '@/assets';

import useToastStore from '@/stores/toastStore';

import { getSSEConnection, startTimer, stopTimer } from '@/apis/timer';

import useNotification from '@/hooks/common/useNotification';

const TIMER_SSE_KEY = 'remaining-time';

const useTimer = (accessCode: string, defaultTime: number, defaultTimeleft: number, onTimerStop: () => void) => {
  const alarmAudio = useRef(new Audio(AlarmSound));

  const [timeLeft, setTimeLeft] = useState(defaultTimeleft);
  const [isActive, setIsActive] = useState(false);

  const { addToast } = useToastStore();
  const { fireNotification } = useNotification();

  const handleStart = () => {
    if (!isActive) {
      startTimer(accessCode);
      setIsActive(true);
      addToast({ status: 'SUCCESS', message: '타이머가 시작되었습니다.' });
    }
  };

  const handlePause = () => {
    stopTimer(accessCode);
    setIsActive(false);
    addToast({ status: 'WARNING', message: '타이머가 일시 정지되었습니다.' });
  };

  const handleStop = () => {
    onTimerStop();
    setTimeLeft(defaultTime);
    setIsActive(false);
  };

  useEffect(() => {
    const sse = getSSEConnection(accessCode);

    const handleTimeLeft = (event: MessageEvent) => {
      if (event.data === 0) {
        handleStop();
        alarmAudio.current.play();
        fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꾸세요!', { requireInteraction: true });
      } else {
        setTimeLeft(event.data);
      }
    };

    sse.addEventListener(TIMER_SSE_KEY, handleTimeLeft);
    window.addEventListener('beforeunload', (event) => event.preventDefault());

    return () => {
      sse.removeEventListener(TIMER_SSE_KEY, handleTimeLeft);
      sse.close();
      window.removeEventListener('beforeunload', (event) => event.preventDefault());
    };
  }, []);

  return { timeLeft, isActive, handleStart, handlePause };
};

export default useTimer;

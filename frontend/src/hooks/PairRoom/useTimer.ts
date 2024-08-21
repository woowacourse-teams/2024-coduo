import { useRef, useState, useEffect } from 'react';

import { AlarmSound } from '@/assets';

import useNotification from '@/hooks/common/useNotification';

const useTimer = (defaultTime: number, onStop: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarmAudio = useRef(new Audio(AlarmSound));

  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const { fireNotification } = useNotification();

  const initializeTimer = () => {
    setTimeLeft(defaultTime);
    setStartTime(null);
    setIsActive(false);
  };

  const handleStart = () => {
    if (!isActive) {
      setStartTime(Date.now() - (defaultTime - timeLeft));
      setIsActive(true);
    }
  };

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    initializeTimer();
    onStop();
  };

  useEffect(() => {
    initializeTimer();
  }, [defaultTime]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const updateTimer = () => {
      if (!startTime) return;

      const elapsedTime = Date.now() - startTime;
      const newTimeLeft = Math.max(defaultTime - elapsedTime, 0);

      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        handleStop();
        alarmAudio.current.play();
        fireNotification('타이머가 끝났어요!', '드라이버 / 내비게이터 역할을 바꾸세요!', {
          requireInteraction: true,
        });
      }
    };

    timerRef.current = setInterval(updateTimer, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, startTime, timeLeft]);

  return { timeLeft, isActive, handleStart, handlePause, handleStop };
};

export default useTimer;

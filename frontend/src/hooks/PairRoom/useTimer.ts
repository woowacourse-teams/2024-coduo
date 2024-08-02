import { useRef, useState, useEffect } from 'react';

import AlarmSound from '@/assets/audio/alarm_sound.mp3';

import useNotification from '@/hooks/common/useNotification';

type ExtendedNotificationOptions = NotificationOptions & {
  actions?: { action: string; title: string }[];
};

const useTimer = (defaultTime: number, onStop: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const alarmAudio = useRef(new Audio(AlarmSound));
  const { fireNotification } = useNotification();

  const handleStart = () => {
    if (!isActive) {
      setStartTime(Date.now() - (defaultTime - timeLeft));
      setIsActive(true);
    }
  };

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
    setStartTime(null);
    onStop();
  };

  useEffect(() => {
    const notifyTimerEnd = () => {
      setIsActive(false);
      setTimeLeft(0);
      alarmAudio.current.play();
      fireNotification('타이머가 끝났어요!', {
        body: '드라이버 / 내비게이터 역할을 바꾸세요!',
        requireInteraction: true,
      } as ExtendedNotificationOptions);
      onStop();
    };

    const updateTimer = () => {
      if (!startTime) return;

      const elapsedTime = Date.now() - startTime;
      const newTimeLeft = defaultTime - elapsedTime;

      if (newTimeLeft <= 0) {
        notifyTimerEnd();
      } else {
        setTimeLeft(newTimeLeft);
      }
    };

    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(updateTimer, 10);
    } else if (timeLeft === 0 && !isActive) {
      setTimeLeft(defaultTime);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, startTime, timeLeft, onStop]);

  return { timeLeft, isActive, handleStart, handlePause, handleStop };
};

export default useTimer;

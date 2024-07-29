import { useRef, useState, useEffect } from 'react';

const useTimer = (defaultTime: number, onStop: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleStart = () => {
    setStartTime(Date.now());
    setIsActive(true);
  };

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
    setStartTime(null);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        if (!startTime) return;

        const elapsedTime = Date.now() - startTime;
        const newTimeLeft = defaultTime - elapsedTime;
        if (newTimeLeft <= 0) {
          setIsActive(false);
          setTimeLeft(0);
          onStop();
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 10);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }

    if (timeLeft === 0) {
      setIsActive(false);
      setTimeLeft(defaultTime);
      onStop();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, startTime, defaultTime, onStop, timeLeft]);

  return { timeLeft, isActive, handleStart, handlePause, handleStop };
};

export default useTimer;

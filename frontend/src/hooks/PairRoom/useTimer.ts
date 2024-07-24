import { useRef, useState, useEffect } from 'react';

const DEFAULT_TIME = 3 * 60 * 1000;

const useTimer = (defaultTime: number = DEFAULT_TIME) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => setIsActive(true);

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(defaultTime);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  return { timeLeft, isActive, handleStart, handlePause, handleStop };
};

export default useTimer;

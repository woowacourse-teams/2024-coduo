import { useRef, useState, useEffect } from 'react';

const useTimer = (defaultTime: number) => {
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
        setTimeLeft((timeLeft) => timeLeft - 1000);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);
      setTimeLeft(defaultTime);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isActive]);

  return { timeLeft, isActive, handleStart, handlePause, handleStop };
};

export default useTimer;

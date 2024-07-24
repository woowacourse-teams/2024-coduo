import { useEffect, useRef, useState } from 'react';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './TimerCard.styles';

const TIMER_DEFAULT = 3 * 60 * 1000;

const formatMinutes = (minutes: number) => (minutes < 10 ? `0${minutes}` : `${minutes}`);
const formatSeconds = (seconds: number) => (seconds < 10 ? `0${seconds}` : `${seconds}`);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = time % 60;

  return { minutes: formatMinutes(minutes), seconds: formatSeconds(seconds) };
};

const TimerCard = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState(TIMER_DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => setIsActive(true);

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(TIMER_DEFAULT);
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

  const { minutes, seconds } = formatTime(timeLeft);

  return (
    <PairRoomCard>
      <S.Layout>
        <S.ProgressBar>
          <S.Timer>
            <S.TimerTextContainer>
              <S.TimerText>{minutes}</S.TimerText>
              분(m)
            </S.TimerTextContainer>
            <S.TimerText>:</S.TimerText>
            <S.TimerTextContainer>
              <S.TimerText>{seconds}</S.TimerText>
              초(s)
            </S.TimerTextContainer>
          </S.Timer>
        </S.ProgressBar>
        <S.IconContainer>
          <S.PlayIcon $isActive={!isActive} onClick={handleStart} />
          <S.PauseIcon $isActive={isActive} onClick={handlePause} />
          <S.StopIcon $isActive={isActive} onClick={handleStop} />
        </S.IconContainer>
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

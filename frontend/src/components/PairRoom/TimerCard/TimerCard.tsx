import { useRef, useEffect } from 'react';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TimerEditPanel from '@/components/PairRoom/TimerCard/TimerEditPanel/TimerEditPanel';

import useTimer from '@/hooks/PairRoom/useTimer';
import useTitleTime from '@/hooks/title/useTitleTime';

import { formatTime } from '@/utils/Timer/formatTime';

import * as S from './TimerCard.styles';

interface TimerCardProps {
  defaultTime: number;
  defaultTimeleft: number;
  onTimerStop: () => void;
  onUpdateTimeLeft: (remainingTime: number) => void;
}

const TimerCard = ({ defaultTime, defaultTimeleft, onTimerStop, onUpdateTimeLeft }: TimerCardProps) => {
  const { timeLeft, isActive, handleStart, handlePause } = useTimer(defaultTime, defaultTimeleft, onTimerStop);

  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  useEffect(() => {
    const handleBeforeMove = (event: BeforeUnloadEvent) => {
      onUpdateTimeLeft(timeLeftRef.current);
      handlePause();
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeMove);
    window.addEventListener('popstate', handleBeforeMove);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeMove);
      window.removeEventListener('popstate', handleBeforeMove);
    };
  }, []);

  // useBeforeUnload((event) => {
  //   onUpdateTimeLeft(timeLeftRef.current);
  //   handlePause();
  //   event.preventDefault();
  // });

  const { minutes, seconds } = formatTime(timeLeft);
  useTitleTime(minutes, seconds);

  return (
    <PairRoomCard>
      <TimerEditPanel isActive={isActive} />
      <S.Layout>
        <S.ProgressBar $progress={(timeLeft / defaultTime) * 100}>
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
          <S.IconButton disabled={isActive} onClick={handleStart}>
            <S.PlayIcon $isActive={!isActive} />
          </S.IconButton>
          <S.IconButton disabled={!isActive} onClick={handlePause}>
            <S.PauseIcon $isActive={isActive} />
          </S.IconButton>
        </S.IconContainer>
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

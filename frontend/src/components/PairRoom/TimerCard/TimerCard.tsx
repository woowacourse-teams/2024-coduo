import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TimerEditPanel from '@/components/PairRoom/TimerCard/TimerEditPanel/TimerEditPanel';

import useTimer from '@/hooks/PairRoom/useTimer';

import * as S from './TimerCard.styles';

const formatMinutes = (minutes: number) => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const formatSeconds = (seconds: number) => (seconds < 10 ? `0${seconds}` : `${seconds}`);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % 60000) / 1000);

  return { minutes: formatMinutes(minutes), seconds: formatSeconds(seconds) };
};

interface TimerCardProps {
  defaultTime: number;
  onTimerStop: () => void;
}

const TimerCard = ({ defaultTime, onTimerStop }: TimerCardProps) => {
  const { timeLeft, isActive, handleStart, handlePause } = useTimer(defaultTime, onTimerStop);

  const { minutes, seconds } = formatTime(timeLeft);

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

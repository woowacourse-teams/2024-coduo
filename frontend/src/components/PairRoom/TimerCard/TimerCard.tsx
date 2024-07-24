import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useTimer from '@/hooks/PairRoom/useTimer';

import * as S from './TimerCard.styles';

const formatMinutes = (minutes: number) => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const formatSeconds = (seconds: number) => (seconds < 10 ? `0${seconds}` : `${seconds}`);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % 60000) / 1000);

  return { minutes: formatMinutes(minutes), seconds: formatSeconds(seconds) };
};

const DEFAULT_TIME = 60 * 1000;

const TimerCard = () => {
  const { timeLeft, isActive, handleStart, handlePause, handleStop } = useTimer(DEFAULT_TIME);
  const { minutes, seconds } = formatTime(timeLeft);

  return (
    <PairRoomCard>
      <S.Layout>
        <S.ProgressBar $progress={(timeLeft / DEFAULT_TIME) * 100}>
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

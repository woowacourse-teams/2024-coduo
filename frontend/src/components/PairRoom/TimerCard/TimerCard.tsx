import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

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
  timeLeft: number;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

const TimerCard = ({ defaultTime, timeLeft, isActive, onStart, onPause, onStop }: TimerCardProps) => {
  const { minutes, seconds } = formatTime(timeLeft);

  return (
    <PairRoomCard>
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
          <S.IconButton disabled={isActive} onClick={onStart}>
            <S.PlayIcon $isActive={!isActive} />
          </S.IconButton>
          <S.IconButton disabled={!isActive} onClick={onPause}>
            <S.PauseIcon $isActive={isActive} />
          </S.IconButton>
          <S.IconButton disabled={!isActive} onClick={onStop}>
            <S.StopIcon $isActive={isActive} />
          </S.IconButton>
        </S.IconContainer>
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

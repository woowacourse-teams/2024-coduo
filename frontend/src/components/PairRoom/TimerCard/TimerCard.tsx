import { useRef } from 'react';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TimerEditPanel from '@/components/PairRoom/TimerCard/TimerEditPanel/TimerEditPanel';

import useTitleTime from '@/hooks/common/useTitleTime';
import useTimer from '@/hooks/PairRoom/useTimer';

import { formatTime } from '@/utils/Timer/formatTime';

import * as S from './TimerCard.styles';

interface TimerCardProps {
  accessCode: string;
  defaultTime: number;
  defaultTimeleft: number;
  onTimerStop: () => void;
}

const TimerCard = ({ accessCode, defaultTime, defaultTimeleft, onTimerStop }: TimerCardProps) => {
  const { timeLeft, isActive, handleStart, handlePause } = useTimer(
    accessCode,
    defaultTime,
    defaultTimeleft,
    onTimerStop,
  );

  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

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

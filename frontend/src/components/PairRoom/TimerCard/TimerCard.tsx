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
      <S.Layout aria-label="타이머">
        <S.ProgressBar
          $progress={(timeLeft / defaultTime) * 100}
          aria-label={`현재 남은 시간은 ${minutes}분 ${seconds}초 입니다.`}
        >
          <S.Timer aria-label={`${minutes}분 ${seconds}초`}>
            <S.TimerTextContainer aria-hidden="true">
              <S.TimerText>{minutes}</S.TimerText>
              분(m)
            </S.TimerTextContainer>
            <S.TimerText aria-hidden="true">:</S.TimerText>
            <S.TimerTextContainer aria-hidden="true">
              <S.TimerText>{seconds}</S.TimerText>
              초(s)
            </S.TimerTextContainer>
          </S.Timer>
        </S.ProgressBar>
        <S.IconContainer>
          <S.IconButton disabled={isActive} onClick={handleStart} aria-label="타이머 시작하기">
            <S.PlayIcon $isActive={!isActive} role="presentation" />
          </S.IconButton>
          <S.IconButton disabled={!isActive} onClick={handlePause} aria-label="타이머 중지하기">
            <S.PauseIcon $isActive={isActive} role="presentation" />
          </S.IconButton>
        </S.IconContainer>
        <TimerEditPanel isActive={isActive} />
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

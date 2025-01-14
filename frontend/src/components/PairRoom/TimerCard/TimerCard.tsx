import { useRef } from 'react';

import { FaPause, FaPlay } from 'react-icons/fa6';

import IconButton from '@/components/_common/IconButton/IconButton';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TimerEditPanel from '@/components/PairRoom/TimerCard/TimerEditPanel/TimerEditPanel';

import useTimer from '@/hooks/PairRoom/useTimer';
import useTitleTime from '@/hooks/PairRoom/useTitleTime';

import { formatTime } from '@/utils/formatTime';

import { theme } from '@/styles/theme';

import * as S from './TimerCard.styles';

interface TimerCardProps {
  socket: WebSocket | null;
  accessCode: string;
  defaultTime: number;
  defaultTimeLeft: number;
  onTimerStop: () => void;
}

const TimerCard = ({ socket, accessCode, defaultTime, defaultTimeLeft, onTimerStop }: TimerCardProps) => {
  const { timeLeft, isActive, handleStart, handlePause } = useTimer(
    socket,
    accessCode,
    defaultTime,
    defaultTimeLeft,
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
          role="timer"
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
          <IconButton
            icon={<FaPlay role="presentation" />}
            size="lg"
            color={theme.color.secondary[500]}
            disabled={isActive}
            onClick={handleStart}
            aria-label="타이머 시작하기"
          />
          <IconButton
            icon={<FaPause role="presentation" />}
            size="lg"
            color={theme.color.secondary[500]}
            disabled={!isActive}
            onClick={handlePause}
            aria-label="타이머 중지하기"
          />
        </S.IconContainer>
        <TimerEditPanel isActive={isActive} />
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

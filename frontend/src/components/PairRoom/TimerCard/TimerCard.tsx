import { IoSettingsOutline } from 'react-icons/io5';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import useToastStore from '@/stores/toastStore';

import useInput from '@/hooks/common/useInput';

import useAddTimer from '@/queries/PairRoomOnboarding/useAddTimer';

import { theme } from '@/styles/theme';

import * as S from './TimerCard.styles';

const formatMinutes = (minutes: number) => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const formatSeconds = (seconds: number) => (seconds < 10 ? `0${seconds}` : `${seconds}`);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % 60000) / 1000);

  return { minutes: formatMinutes(minutes), seconds: formatSeconds(seconds) };
};

interface TimerCardProps {
  accessCode: string;
  defaultTime: number;
  timeLeft: number;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
}

const TimerCard = ({ accessCode, defaultTime, timeLeft, isActive, onStart, onPause }: TimerCardProps) => {
  const { addToast } = useToastStore();

  const { value, handleChange } = useInput();
  const { handleAddTimer } = useAddTimer(() =>
    addToast({ status: 'SUCCESS', message: '타이머 시간이 정상적으로 수정되었습니다.' }),
  );

  const { minutes, seconds } = formatTime(timeLeft);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTimer({ timer: value, accessCode });
  };

  return (
    <PairRoomCard>
      <S.PanelContainer>
        <IoSettingsOutline size="2rem" color={theme.color.black[70]} />
        <S.Panel>
          <S.Title>타이머 시간 수정</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <Input id="timer" value={value} placeholder="타이머 시간 (분)" onChange={handleChange} />
            <S.ButtonContainer>
              <Button type="button" color="secondary" size="sm" filled={false} rounded={true}>
                취소
              </Button>
              <Button type="submit" color="secondary" size="sm" rounded={true}>
                확인
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.Panel>
      </S.PanelContainer>
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
        </S.IconContainer>
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

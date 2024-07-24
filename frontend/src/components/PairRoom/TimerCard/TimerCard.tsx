import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './TimerCard.styles';

const TimerCard = () => {
  return (
    <PairRoomCard>
      <S.Layout>
        <S.ProgressBar>
          <S.Timer>
            <S.TimerTextContainer>
              <S.TimerText>00</S.TimerText>
              분(m)
            </S.TimerTextContainer>
            <S.TimerText>:</S.TimerText>
            <S.TimerTextContainer>
              <S.TimerText>00</S.TimerText>
              초(s)
            </S.TimerTextContainer>
          </S.Timer>
        </S.ProgressBar>
        <S.IconContainer>
          <S.PlayIcon $isActive={false} />
          <S.PauseIcon $isActive={false} />
          <S.StopIcon $isActive={false} />
        </S.IconContainer>
      </S.Layout>
    </PairRoomCard>
  );
};

export default TimerCard;

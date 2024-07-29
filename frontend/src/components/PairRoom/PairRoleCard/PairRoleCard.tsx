import Button from '@/components/common/Button/Button';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairRoleCard.styles';

interface PairRoleCardProps {
  driver: string;
  navigator: string;
  onSwap: () => void;
  onTimerReset: () => void;
}

const PairRoleCard = ({ driver, navigator, onSwap, onTimerReset }: PairRoleCardProps) => {
  return (
    <S.Layout>
      <PairRoomCard>
        <S.RoleBoxContainer>
          <S.DriverBox>
            <S.RoleIcon>💻</S.RoleIcon>
            <S.RoleTextContainer>
              <S.DriverLabel>드라이버</S.DriverLabel>
              <S.DriverText>{driver}</S.DriverText>
            </S.RoleTextContainer>
          </S.DriverBox>
          <Button
            css={S.buttonStyle}
            onClick={() => {
              onSwap();
              onTimerReset();
            }}
          >
            <S.SwapIcon />
          </Button>
          <S.NavigatorBox>
            <S.RoleTextContainer>
              <S.NavigatorLabel>네비게이터</S.NavigatorLabel>
              <S.NavigatorText>{navigator}</S.NavigatorText>
            </S.RoleTextContainer>
            <S.RoleIcon>🧭</S.RoleIcon>
          </S.NavigatorBox>
        </S.RoleBoxContainer>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairRoleCard;

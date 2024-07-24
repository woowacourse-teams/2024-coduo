import Button from '@/components/common/Button/Button';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairRoleCard.styles';

const PairRoleCard = () => {
  return (
    <S.Layout>
      <PairRoomCard>
        <S.RoleBoxContainer>
          <S.DriverBox>
            <S.RoleIcon>💻</S.RoleIcon>
            <S.RoleTextContainer>
              <S.DriverLabel>드라이버</S.DriverLabel>
              <S.DriverText>퍼렁</S.DriverText>
            </S.RoleTextContainer>
          </S.DriverBox>
          <Button css={S.buttonStyle}>
            <S.SwapIcon />
          </Button>
          <S.NavigatorBox>
            <S.RoleTextContainer>
              <S.NavigatorLabel>네비게이터</S.NavigatorLabel>
              <S.NavigatorText>포롱</S.NavigatorText>
            </S.RoleTextContainer>
            <S.RoleIcon>🧭</S.RoleIcon>
          </S.NavigatorBox>
        </S.RoleBoxContainer>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairRoleCard;

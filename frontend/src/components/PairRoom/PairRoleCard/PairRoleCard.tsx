import Tooltip from '@/components/_common/Tooltip/Tooltip';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairRoleCard.styles';

interface PairRoleCardProps {
  driver: string;
  navigator: string;
}

const PairRoleCard = ({ driver, navigator }: PairRoleCardProps) => {
  return (
    <S.Layout aria-label={`현재 드라이버는 ${driver}, 내비게이터는 ${navigator} 입니다.`}>
      <PairRoomCard>
        <S.RoleBoxContainer>
          <S.DriverBox>
            <S.RoleIcon aria-hidden="true">💻</S.RoleIcon>
            <S.RoleTextContainer>
              <Tooltip
                direction="top"
                message="드라이버는 내비게이터가 설명한 방식대로 실제 코드를 작성하는 역할을 합니다."
              >
                <S.DriverLabel>드라이버</S.DriverLabel>
              </Tooltip>
              <S.DriverText>{driver}</S.DriverText>
            </S.RoleTextContainer>
          </S.DriverBox>
          <S.NavigatorBox>
            <S.RoleTextContainer>
              <Tooltip
                direction="top"
                message="내비게이터는 코드의 논리적 흐름, 설계, 오류 등을 검토하며, 드라이버에게 피드백을 제공합니다."
              >
                <S.NavigatorLabel>내비게이터</S.NavigatorLabel>
              </Tooltip>
              <S.NavigatorText>{navigator}</S.NavigatorText>
            </S.RoleTextContainer>
            <S.RoleIcon aria-hidden="true">🧭</S.RoleIcon>
          </S.NavigatorBox>
        </S.RoleBoxContainer>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairRoleCard;

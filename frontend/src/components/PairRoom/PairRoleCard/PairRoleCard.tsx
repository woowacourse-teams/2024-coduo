import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairRoleCard.styles';

// TODO: 드라이버 & 네비게이터 교체 기능 추가
const PairRoleCard = () => {
  return (
    <S.Layout>
      <PairRoomCard>
        <div>내용</div>
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairRoleCard;

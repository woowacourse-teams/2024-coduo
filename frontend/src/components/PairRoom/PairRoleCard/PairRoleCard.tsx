import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './PairRoleCard.styles';

const PairRoleCard = () => {
  return (
    <S.PairRoleCard>
      <PairRoomCard>
        <div>내용</div>
      </PairRoomCard>
    </S.PairRoleCard>
  );
};

export default PairRoleCard;

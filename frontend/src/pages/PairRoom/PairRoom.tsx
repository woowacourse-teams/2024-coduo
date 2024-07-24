import MemoCard from '@/components/PairRoom/MemoCard/MemoCard';
import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import ReferenceCard from '@/components/PairRoom/ReferenceCard/ReferenceCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  return (
    <S.Layout>
      <PairListCard driver="퍼렁" navigator="포롱" roomCode="IUUIASDFJK" onRoomDelete={() => {}} />
      <S.Container>
        <PairRoleCard />
        <TimerCard />
      </S.Container>
      <S.Container>
        <ReferenceCard />
        <MemoCard />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;

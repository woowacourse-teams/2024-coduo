import { IoPeople } from 'react-icons/io5';

import PairListCard from '@/components/PairRoom/PairListCard/PairListCard';
import PairRoleCard from '@/components/PairRoom/PairRoleCard/PairRoleCard';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TimerCard from '@/components/PairRoom/TimerCard/TimerCard';

import { theme } from '@/styles/theme';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  return (
    <S.Layout>
      <PairListCard />
      <S.Container>
        <PairRoleCard />
        <TimerCard />
      </S.Container>
      <S.Container>
        <PairRoomCard>
          <PairRoomCard.Header icon={<IoPeople color={theme.color.primary[500]} />} title="링크" />
        </PairRoomCard>
        <PairRoomCard>
          <PairRoomCard.Header icon={<IoPeople color={theme.color.primary[500]} />} title="메모" />
        </PairRoomCard>
      </S.Container>
    </S.Layout>
  );
};

export default PairRoom;

import { IoPeople } from 'react-icons/io5';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

import * as S from './PairRoom.styles';

const PairRoom = () => {
  return (
    <S.Layout>
      <S.PairListCard>
        <PairRoomCard>
          <PairRoomCard.Header icon={<IoPeople color={theme.color.primary[500]} />} title="페어" />
        </PairRoomCard>
      </S.PairListCard>
      <S.Container>
        <S.PairRoleCard>
          <PairRoomCard>
            <div>내용</div>
          </PairRoomCard>
        </S.PairRoleCard>
        <PairRoomCard>
          <div>내용</div>
        </PairRoomCard>
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

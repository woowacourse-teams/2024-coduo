import { IoPeople } from 'react-icons/io5';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

import * as S from './PairListCard.styles';

const PairListCard = () => {
  return (
    <S.Layout>
      <PairRoomCard>
        <PairRoomCard.Header icon={<IoPeople color={theme.color.primary[500]} />} title="페어" />
      </PairRoomCard>
    </S.Layout>
  );
};

export default PairListCard;

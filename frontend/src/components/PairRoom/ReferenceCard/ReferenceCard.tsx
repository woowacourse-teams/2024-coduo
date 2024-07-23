import { IoIosLink } from 'react-icons/io';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

const ReferenceCard = () => {
  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosLink color={theme.color.primary[500]} />} title="링크" />
    </PairRoomCard>
  );
};

export default ReferenceCard;

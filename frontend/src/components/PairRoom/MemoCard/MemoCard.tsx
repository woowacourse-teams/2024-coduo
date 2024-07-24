import { IoMdOpen } from 'react-icons/io';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

// TODO: 메모 기능 추가
const MemoCard = () => {
  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoMdOpen color={theme.color.primary[500]} />} title="메모" />
    </PairRoomCard>
  );
};

export default MemoCard;

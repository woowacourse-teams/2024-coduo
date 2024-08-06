import { IoIosCheckbox } from 'react-icons/io';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import { theme } from '@/styles/theme';

const TodoListCard = () => {
  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosCheckbox color={theme.color.primary[500]} />} title="투두 리스트" />
    </PairRoomCard>
  );
};

export default TodoListCard;

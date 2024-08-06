import { IoIosCheckbox } from 'react-icons/io';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import { theme } from '@/styles/theme';

import * as S from './TodoListCard.styles';

const TodoListCard = () => {
  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosCheckbox color={theme.color.primary[500]} />} title="투두 리스트" />
      <S.TodoListWrapper>
        <TodoItem content="Item 1" />
        <TodoItem content="Item 2" />
        <TodoItem content="Item 3" />
        <TodoItem content="Item 4" />
        <TodoItem content="Item 5" />
      </S.TodoListWrapper>
    </PairRoomCard>
  );
};

export default TodoListCard;

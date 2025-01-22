import Header from '@/components/CompletedPairRoom/TodoListCard/Header/Header';
import TodoList from '@/components/CompletedPairRoom/TodoListCard/TodoList/TodoList';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

import * as S from './TodoListCard.styles';

const TodoListCard = () => {
  return (
    <S.Layout>
      <PairRoomCard>
        <Header />
        <S.Body>
          <TodoList />
        </S.Body>
      </PairRoomCard>
    </S.Layout>
  );
};

export default TodoListCard;

import { useParams } from 'react-router-dom';

import TodoItem from '@/components/CompletedPairRoom/TodoListCard/TodoItem/TodoItem';

import useTodos from '@/queries/PairRoom/useTodos';

import * as S from './TodoList.styles';

const TodoList = () => {
  const { accessCode } = useParams();

  const { todos } = useTodos(accessCode || '');

  return (
    <S.Layout>
      {todos.length > 0 ? (
        <>
          <S.CountText>총 {todos.length}개</S.CountText>
          <S.TodoListContainer>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </S.TodoListContainer>
        </>
      ) : (
        <S.EmptyText>저장된 투두 리스트가 없습니다.</S.EmptyText>
      )}
    </S.Layout>
  );
};

export default TodoList;

import { useParams } from 'react-router-dom';

import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useDragAndDrop from '@/hooks/PairRoom/useDragAndDrop';

import useGetTodos from '@/queries/PairRoom/useGetTodos';
import useMutateTodos from '@/queries/PairRoom/useMutateTodos';

import * as S from './TodoList.styles';

const TodoList = () => {
  const { accessCode } = useParams();

  const { todos } = useGetTodos(accessCode || '');
  const { updateOrderMutation } = useMutateTodos();

  const handleUpdateOrder = (todoId: number, order: number) => updateOrderMutation({ todoId, order });

  const { dragOverItem, handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(todos, handleUpdateOrder);

  return (
    <S.Layout>
      {todos.length > 0 ? (
        <>
          <S.CountText>총 {todos.length}개</S.CountText>
          <S.TodoListContainer>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isDraggedOver={dragOverItem?.id === todo.id}
                onDragStart={handleDragStart}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
              />
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

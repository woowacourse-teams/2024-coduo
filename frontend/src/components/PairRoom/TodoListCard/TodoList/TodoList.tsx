import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useSocketStore from '@/stores/socketStore';

import { Todo } from '@/apis/http/todo';
import { publishTodoMessage } from '@/apis/websocket/todo';

import useDragAndDrop from '@/hooks/PairRoom/useDragAndDrop';

import * as S from './TodoList.styles';

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  const { client, accessCode } = useSocketStore();

  const handleUpdateOrder = (todoId: number, order: number) => {
    publishTodoMessage.updateOrder(client, accessCode, todoId, order);
  };

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

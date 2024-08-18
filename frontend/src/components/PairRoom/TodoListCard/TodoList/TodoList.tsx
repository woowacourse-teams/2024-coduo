import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import { Todo } from '@/apis/todo';

import useDragAndDrop from '@/hooks/common/useDragAndDrop';

import * as S from './TodoList.styles';

interface TodoListProps {
  todos: Todo[];
  handleOrder: (todoId: number, order: number) => void;
}

const TodoList = ({ todos, handleOrder }: TodoListProps) => {
  const { dragItem, dragOverItem, dragOverPosition, handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(
    todos,
    handleOrder,
  );

  return (
    <S.Layout>
      {todos.length > 0 ? (
        todos.map((todo, idx) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            content={todo.content}
            dragOverPosition={dragOverPosition}
            isDraggedOver={dragItem !== dragOverItem && dragOverItem === idx}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          />
        ))
      ) : (
        <S.EmptyText>저장된 투두 리스트가 없습니다.</S.EmptyText>
      )}
    </S.Layout>
  );
};

export default TodoList;

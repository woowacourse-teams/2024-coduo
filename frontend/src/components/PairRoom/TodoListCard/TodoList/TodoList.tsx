import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useDragAndDrop from '@/hooks/common/useDragAndDrop';

import * as S from './TodoList.styles';

interface TodoListProps {
  todos: string[];
  handleTodos: (newTodos: string[]) => void;
}

const TodoList = ({ todos, handleTodos }: TodoListProps) => {
  const { handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(todos, handleTodos);

  return (
    <S.TodoListWrapper>
      {todos.length > 0 ? (
        todos.map((todo, idx) => (
          <TodoItem
            key={idx}
            id={idx}
            content={todo}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          />
        ))
      ) : (
        <S.EmptyText>저장된 투두 리스트가 없습니다.</S.EmptyText>
      )}
    </S.TodoListWrapper>
  );
};

export default TodoList;

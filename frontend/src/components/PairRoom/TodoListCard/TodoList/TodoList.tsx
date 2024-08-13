import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useDragAndDrop from '@/hooks/common/useDragAndDrop';

import * as S from './TodoList.styles';

interface TodoListProps {
  todos: string[];
  handleTodos: (newTodos: string[]) => void;
}

const TodoList = ({ todos, handleTodos }: TodoListProps) => {
  const { dragItem, dragOverItem, dragOverPosition, handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(
    todos,
    handleTodos,
  );

  return (
    <S.Layout>
      {todos.length > 0 ? (
        todos.map((todo, idx) => (
          <TodoItem
            key={idx}
            id={idx}
            content={todo}
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

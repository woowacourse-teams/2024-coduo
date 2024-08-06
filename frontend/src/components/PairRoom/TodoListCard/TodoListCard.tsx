import { useState, useRef } from 'react';

import { IoIosCheckbox } from 'react-icons/io';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import { theme } from '@/styles/theme';

import * as S from './TodoListCard.styles';

const TodoListCard = () => {
  const [todos, setTodos] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (position: number) => (dragItem.current = position);

  const handleDragEnter = (position: number) => (dragOverItem.current = position);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (dragItem.current === null || dragOverItem.current === null) return;

    const newTodos = [...todos];
    console.log(dragItem.current, newTodos[dragItem.current]);
    const draggedItem = newTodos[dragItem.current];

    newTodos.splice(dragItem.current, 1);
    newTodos.splice(dragOverItem.current, 0, draggedItem);

    dragItem.current = null;
    dragOverItem.current = null;

    setTodos(newTodos);
  };

  return (
    <PairRoomCard>
      <PairRoomCard.Header icon={<IoIosCheckbox color={theme.color.primary[500]} />} title="투두 리스트" />
      <S.TodoListWrapper>
        {todos.map((todo, idx) => (
          <TodoItem
            key={idx}
            position={idx}
            content={todo}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          />
        ))}
      </S.TodoListWrapper>
    </PairRoomCard>
  );
};

export default TodoListCard;

import { useState, useRef } from 'react';

import { IoIosCheckbox } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useInput from '@/hooks/common/useInput';

import { theme } from '@/styles/theme';

import * as S from './TodoListCard.styles';

const TodoListCard = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [todos, setTodos] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  const { value, handleChange, resetValue } = useInput();

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

  const addTodoItem = () => {
    setTodos((prev) => [...prev, value]);

    resetValue();
    setIsInputOpen(false);
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
      <S.Footer>
        {isInputOpen ? (
          <S.InputContainer>
            <Input value={value} onChange={handleChange} />
            <S.ButtonContainer>
              <Button size="sm" filled={false} rounded={true} onClick={() => setIsInputOpen(false)}>
                취소
              </Button>
              <Button size="sm" rounded={true} onClick={addTodoItem}>
                확인
              </Button>
            </S.ButtonContainer>
          </S.InputContainer>
        ) : (
          <S.AddButton onClick={() => setIsInputOpen(true)}>
            <LuPlus />
            투두 추가하기
          </S.AddButton>
        )}
      </S.Footer>
    </PairRoomCard>
  );
};

export default TodoListCard;

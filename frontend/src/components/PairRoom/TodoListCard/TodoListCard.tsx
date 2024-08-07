import { useState } from 'react';

import { IoIosCheckbox } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TodoItem from '@/components/PairRoom/TodoListCard/TodoItem/TodoItem';

import useDragAndDrop from '@/hooks/common/useDragAndDrop';
import useInput from '@/hooks/common/useInput';

import { theme } from '@/styles/theme';

import * as S from './TodoListCard.styles';

interface TodoListCardProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const TodoListCard = ({ isOpen, toggleIsOpen }: TodoListCardProps) => {
  const [todos, setTodos] = useState<string[]>([
    '아이템 1',
    '아이템 2',
    '아이템 3',
    '아이템 1',
    '아이템 2',
    '아이템 3',
    '아이템 1',
    '아이템 2',
    '아이템 3',
  ]);
  const [isInputOpen, setIsInputOpen] = useState(false);

  const handleTodos = (newTodos: string[]) => setTodos(newTodos);

  const { value, handleChange, resetValue } = useInput();
  const { handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(todos, handleTodos);

  const addTodoItem = () => {
    setTodos((prev) => [...prev, value]);
    resetValue();
    setIsInputOpen(false);
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <PairRoomCard.Header
          icon={<IoIosCheckbox color={theme.color.primary[500]} />}
          title="투두 리스트"
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
        />
        {isOpen && (
          <S.Body>
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
            <S.Footer>
              {isInputOpen ? (
                <S.InputContainer>
                  <Input $css={S.inputStyles} value={value} onChange={handleChange} />
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
          </S.Body>
        )}
      </PairRoomCard>
    </S.Layout>
  );
};

export default TodoListCard;

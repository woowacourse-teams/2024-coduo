import { useState } from 'react';

import { IoIosCheckbox } from 'react-icons/io';
import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import ToolTipQuestionBox from '@/components/common/Tooltip/ToolTipQuestionBox';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import TodoList from '@/components/PairRoom/TodoListCard/TodoList/TodoList';

import useInput from '@/hooks/common/useInput';

import { theme } from '@/styles/theme';

import * as S from './TodoListCard.styles';

interface TodoListCardProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const TodoListCard = ({ isOpen, toggleIsOpen }: TodoListCardProps) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const { value, handleChange, resetValue } = useInput();

  const handleTodos = (newTodos: string[]) => setTodos(newTodos);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prev) => [...prev, value]);

    resetValue();
    setIsFooterOpen(false);
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <PairRoomCard.Header
          icon={<IoIosCheckbox color={theme.color.primary[500]} />}
          title="투두 리스트"
          secondIcon={
            <ToolTipQuestionBox message="미션에 대한 todo 를 작성해보세요. 작성한 투두는 markdown 으로 복사가 가능합니다. " />
          }
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
        />
        <S.Body $isOpen={isOpen}>
          <TodoList todos={todos} handleTodos={handleTodos} />
          <S.Footer>
            {isFooterOpen ? (
              <S.Form onSubmit={addTodo}>
                <Input $css={S.inputStyles} value={value} onChange={handleChange} />
                <S.ButtonContainer>
                  <Button type="button" size="sm" filled={false} rounded={true} onClick={() => setIsFooterOpen(false)}>
                    취소
                  </Button>
                  <Button type="submit" size="sm" rounded={true} disabled={value === ''}>
                    확인
                  </Button>
                </S.ButtonContainer>
              </S.Form>
            ) : (
              <S.FooterButton onClick={() => setIsFooterOpen(true)}>
                <LuPlus />
                투두 추가하기
              </S.FooterButton>
            )}
          </S.Footer>
        </S.Body>
      </PairRoomCard>
    </S.Layout>
  );
};

export default TodoListCard;

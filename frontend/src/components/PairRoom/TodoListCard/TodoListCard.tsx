import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { LuPlus } from 'react-icons/lu';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Header from '@/components/PairRoom/TodoListCard/Header/Header';
import TodoList from '@/components/PairRoom/TodoListCard/TodoList/TodoList';

import useInput from '@/hooks/common/useInput';

import useTodos from '@/queries/PairRoom/useTodos';

import * as S from './TodoListCard.styles';

interface TodoListCardProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const TodoListCard = ({ isOpen, toggleIsOpen }: TodoListCardProps) => {
  const { accessCode } = useParams();

  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const { handleAddTodos } = useTodos(accessCode || '');

  const { value, handleChange, resetValue } = useInput();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddTodos(value);

    resetValue();
    setIsFooterOpen(false);
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        <S.Body $isOpen={isOpen}>
          <TodoList />
          <S.Footer>
            {isFooterOpen ? (
              <S.Form onSubmit={handleSubmit}>
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

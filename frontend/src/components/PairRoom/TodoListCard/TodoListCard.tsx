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

  const { value, handleChange, resetValue } = useInput();
  const { handleAddTodos } = useTodos(accessCode || '');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTodos(value);
    resetValue();
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        <S.Body $isOpen={isOpen}>
          <TodoList />
          <S.Footer>
            <S.Form onSubmit={handleSubmit}>
              <Input
                $css={S.inputStyles}
                value={value}
                onChange={handleChange}
                maxLength={100}
                placeholder="할 일의 내용을 입력해 주세요."
              />
              <Button
                $css={S.buttonStyles}
                type="submit"
                aria-label="투두 리스트 추가하기"
                size="sm"
                rounded={true}
                disabled={value.trim() === ''}
              >
                <LuPlus size="1.6rem" role="presentation" />
              </Button>
            </S.Form>
          </S.Footer>
        </S.Body>
      </PairRoomCard>
    </S.Layout>
  );
};

export default TodoListCard;

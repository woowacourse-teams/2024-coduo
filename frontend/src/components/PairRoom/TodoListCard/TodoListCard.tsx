import { LuPlus } from 'react-icons/lu';

import Button from '@/components/_common/Button/Button';
import Input from '@/components/_common/InputField/Input/Input';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import Header from '@/components/PairRoom/TodoListCard/Header/Header';
import TodoList from '@/components/PairRoom/TodoListCard/TodoList/TodoList';

import useSocketStore from '@/stores/socketStore';

import { Todo } from '@/apis/http/todo';
import { publishTodoMessage } from '@/apis/websocket/todo';

import useInput from '@/hooks/_common/useInput';
import useTodo from '@/hooks/PairRoom/useTodo';

import * as S from './TodoListCard.styles';

interface TodoListCardProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  defaultTodos: Todo[];
}

const TodoListCard = ({ isOpen, toggleIsOpen, defaultTodos }: TodoListCardProps) => {
  const { todos } = useTodo(defaultTodos);
  const { value, handleChange, resetValue } = useInput();

  const { client, accessCode } = useSocketStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishTodoMessage.add(client, accessCode, value);
    resetValue();
  };

  return (
    <S.Layout>
      <PairRoomCard>
        <Header isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        <S.Body $isOpen={isOpen}>
          <TodoList todos={todos} />
          <S.Footer>
            <S.Form onSubmit={handleSubmit}>
              <Input
                height="4rem"
                borderRadius="0.6rem"
                $css={S.inputStyles}
                value={value}
                onChange={handleChange}
                maxLength={100}
                placeholder="할 일의 내용을 입력해 주세요."
              />
              <Button
                width="4.4rem"
                height="4rem"
                borderRadius="0.6rem"
                type="submit"
                aria-label="투두 리스트 추가하기"
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

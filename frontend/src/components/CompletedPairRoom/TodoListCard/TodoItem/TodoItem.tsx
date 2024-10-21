import { useState } from 'react';

import { Todo } from '@/apis/todo';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [, onCopy] = useCopyClipBoard();

  const { isChecked, content } = todo;

  return (
    <S.Layout $isChecked={isChecked} $isIconHovered={isIconHovered}>
      <S.TodoContainer $isChecked={isChecked}>
        <p>{content}</p>
      </S.TodoContainer>
      <S.IconContainer>
        <S.CopyIcon
          $isChecked={isChecked}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
          onClick={() => onCopy(content)}
        />
      </S.IconContainer>
    </S.Layout>
  );
};

export default TodoItem;

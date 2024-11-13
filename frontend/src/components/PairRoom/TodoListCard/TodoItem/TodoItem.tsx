import { useState } from 'react';

import CheckBox from '@/components/_common/CheckBox/CheckBox';

import { Todo } from '@/apis/todo';

import useCopyClipBoard from '@/hooks/_common/useCopyClipboard';

import useTodosMutation from '@/queries/PairRoom/useTodosMutation';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  todo: Todo;
  isDraggedOver: boolean;
  onDragStart: (position: number) => void;
  onDragEnter: (position: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem = ({ todo, isDraggedOver, onDragStart, onDragEnter, onDrop }: TodoItemProps) => {
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [, onCopy] = useCopyClipBoard();

  const { updateCheckedMutation, deleteTodoMutation } = useTodosMutation();

  const { id, isChecked, content } = todo;

  return (
    <S.Layout
      $isChecked={isChecked}
      $isIconHovered={isIconHovered}
      $isDraggedOver={isDraggedOver}
      draggable
      onDragStart={() => onDragStart(id)}
      onDragEnter={() => onDragEnter(id)}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={onDrop}
    >
      <S.TodoContainer $isChecked={isChecked}>
        <CheckBox isChecked={isChecked} onClick={() => updateCheckedMutation({ todoId: id })} />
        <p>{content}</p>
      </S.TodoContainer>
      <S.IconContainer>
        <S.CopyIcon
          $isChecked={isChecked}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
          onClick={() => onCopy(content)}
        />
        <S.DeleteIcon
          $isChecked={isChecked}
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
          onClick={() => deleteTodoMutation({ todoId: id })}
        />
      </S.IconContainer>
    </S.Layout>
  );
};

export default TodoItem;

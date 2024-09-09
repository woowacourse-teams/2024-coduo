import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CheckBox from '@/components/common/CheckBox/CheckBox';

import { Todo } from '@/apis/todo';

import useTodos from '@/queries/PairRoom/useTodos';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  todo: Todo;
  isDraggedOver: boolean;
  onDragStart: (position: number) => void;
  onDragEnter: (position: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem = ({ todo, isDraggedOver, onDragStart, onDragEnter, onDrop }: TodoItemProps) => {
  const { accessCode } = useParams();

  const [isIconHovered, setIsIconHovered] = useState(false);

  const { handleUpdateChecked, handleDeleteTodo } = useTodos(accessCode || '');

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
        <CheckBox isChecked={isChecked} onClick={() => handleUpdateChecked(id)} />
        <p>{content}</p>
      </S.TodoContainer>
      <S.DeleteIcon
        $isChecked={isChecked}
        onMouseEnter={() => setIsIconHovered(true)}
        onMouseLeave={() => setIsIconHovered(false)}
        onClick={() => handleDeleteTodo(id)}
      />
    </S.Layout>
  );
};

export default TodoItem;

import CheckBox from '@/components/common/CheckBox/CheckBox';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  id: number;
  content: string;
  isDraggedOver: boolean;
  onDragStart: (position: number) => void;
  onDragEnter: (position: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem = ({ id, content, isDraggedOver, onDragStart, onDragEnter, onDrop }: TodoItemProps) => {
  return (
    <S.Layout
      $isDraggedOver={isDraggedOver}
      draggable
      onDragStart={() => onDragStart(id)}
      onDragEnter={() => onDragEnter(id)}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={onDrop}
    >
      <CheckBox />
      <p>{content}</p>
    </S.Layout>
  );
};

export default TodoItem;

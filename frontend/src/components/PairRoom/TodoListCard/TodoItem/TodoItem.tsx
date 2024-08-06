import CheckBox from '@/components/common/CheckBox/CheckBox';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  position: number;
  content: string;
  onDragStart: (position: number) => void;
  onDragEnter: (position: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem = ({ position, content, onDragStart, onDragEnter, onDrop }: TodoItemProps) => {
  return (
    <S.Layout
      draggable
      onDragStart={() => onDragStart(position)}
      onDragEnter={() => onDragEnter(position)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <CheckBox />
      <p>{content}</p>
    </S.Layout>
  );
};

export default TodoItem;

import CheckBox from '@/components/common/CheckBox/CheckBox';

import type { DragPosition } from '@/hooks/common/useDragAndDrop';

import * as S from './TodoItem.styles';

interface TodoItemProps {
  id: number;
  content: string;
  dragOverPosition: DragPosition | null;
  isDraggedOver: boolean;
  onDragStart: (position: number) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>, position: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem = ({
  id,
  content,
  dragOverPosition,
  isDraggedOver,
  onDragStart,
  onDragEnter,
  onDrop,
}: TodoItemProps) => {
  return (
    <>
      {isDraggedOver && dragOverPosition === 'ABOVE' && <S.Divider />}
      <S.Layout
        draggable
        onDragStart={() => onDragStart(id)}
        onDragEnter={(event) => onDragEnter(event, id)}
        onDragOver={(event) => event.preventDefault()}
        onDragEnd={onDrop}
      >
        <CheckBox />
        <p>{content}</p>
      </S.Layout>
      {isDraggedOver && dragOverPosition === 'BELOW' && <S.Divider />}
    </>
  );
};

export default TodoItem;

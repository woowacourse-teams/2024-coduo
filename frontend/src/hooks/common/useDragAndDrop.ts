import { useRef } from 'react';

const useDragAndDrop = (list: string[], handleList: (newList: string[]) => void) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (position: number) => (dragItem.current = position);

  const handleDragEnter = (position: number) => (dragOverItem.current = position);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (dragItem.current === null || dragOverItem.current === null) return;

    const newList = [...list];
    const draggedItem = newList[dragItem.current];

    newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, draggedItem);

    dragItem.current = null;
    dragOverItem.current = null;

    handleList(newList);
  };

  return { handleDragStart, handleDragEnter, handleDrop };
};

export default useDragAndDrop;

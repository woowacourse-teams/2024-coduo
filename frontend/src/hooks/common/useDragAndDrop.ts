import { useState } from 'react';

export type DragPosition = 'ABOVE' | 'BELOW';

const useDragAndDrop = (list: string[], handleList: (newList: string[]) => void) => {
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<DragPosition | null>(null);

  const handleDragStart = (position: number) => setDragItem(position);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, position: number) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const mouseY = event.clientY;

    setDragOverItem(position);
    setDragOverPosition(mouseY < targetRect.y + targetRect.height / 2 ? 'ABOVE' : 'BELOW');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (dragItem === null || dragOverItem === null || dragOverPosition === null || dragItem === dragOverItem) return;

    const newList = [...list];
    const draggedItem = newList[dragItem];

    newList.splice(dragItem, 1);
    newList.splice(dragOverPosition === 'ABOVE' ? dragOverItem : dragOverItem + 1, 0, draggedItem);

    setDragItem(null);
    setDragOverItem(null);
    setDragOverPosition(null);

    handleList(newList);
  };

  return { dragItem, dragOverItem, dragOverPosition, handleDragStart, handleDragEnter, handleDrop };
};

export default useDragAndDrop;

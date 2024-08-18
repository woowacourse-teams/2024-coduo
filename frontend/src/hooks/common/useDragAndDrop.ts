import { useState } from 'react';

import { Todo } from '@/apis/todo';

export type DragPosition = 'ABOVE' | 'BELOW';

const useDragAndDrop = (list: Todo[], handleOrder: (todoId: number, order: number) => void) => {
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

    handleOrder(list[dragItem].id, list[dragOverPosition === 'ABOVE' ? dragOverItem : dragOverItem + 1].sort);

    setDragItem(null);
    setDragOverItem(null);
    setDragOverPosition(null);
  };

  return { dragItem, dragOverItem, dragOverPosition, handleDragStart, handleDragEnter, handleDrop };
};

export default useDragAndDrop;

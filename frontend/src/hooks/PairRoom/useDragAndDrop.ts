import { useState } from 'react';

import { Todo } from '@/apis/todo';

export type DragPosition = 'ABOVE' | 'BELOW';

const useDragAndDrop = (list: Todo[], handleOrder: (todoId: number, order: number) => void) => {
  const [dragItem, setDragItem] = useState<Todo | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Todo | null>(null);

  const handleDragStart = (id: number) => setDragItem(list.find((item) => item.id === id) || null);

  const handleDragEnter = (id: number) => setDragOverItem(list.find((item) => item.id === id) || null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!dragItem || !dragOverItem || dragItem.id === dragOverItem.id) return;

    handleOrder(dragItem.id, dragOverItem.order);

    setDragItem(null);
    setDragOverItem(null);
  };

  return { dragItem, dragOverItem, handleDragStart, handleDragEnter, handleDrop };
};

export default useDragAndDrop;

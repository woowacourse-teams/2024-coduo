import { useState } from 'react';

import { Todo } from '@/components/PairRoom/TodoListCard/TodoListCard.type';

const TODO_MESSAGES = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

const useTodo = (client: Client | null, accessCode: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return { todos, setTodos };
};

export default useTodo;

import { useState, useEffect } from 'react';

import useSocketStore from '@/stores/socketStore';

import { Todo } from '@/apis/http/todo';
import { subscribeTopic } from '@/apis/websocket/websocket';

const useTodo = (defaultTodos: Todo[]) => {
  const { client, isConnected, accessCode } = useSocketStore();

  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  const handleTodos = (todos: Todo[]) => setTodos(todos);

  useEffect(() => {
    if (client && isConnected) {
      // 전체 투두
      subscribeTopic<Todo[]>(client, `/topic/${accessCode}/todo`, handleTodos);
    }

    return () => {
      if (client && isConnected) {
        client.unsubscribe(`/topic/${accessCode}/todo`);
      }
    };
  }, [client]);

  return { todos };
};

export default useTodo;

import { useQuery } from '@tanstack/react-query';

import { getTodos } from '@/apis/http/todo';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useTodosQuery = (accessCode: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS],
    queryFn: () => getTodos(accessCode),
  });

  return { todos: data || [] };
};

export default useTodosQuery;

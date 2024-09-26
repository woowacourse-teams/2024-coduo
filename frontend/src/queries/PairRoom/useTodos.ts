import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getTodos, addTodos, updateOrder, updateChecked, updateContents, deleteTodo } from '@/apis/todo';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useTodos = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS],
    queryFn: () => getTodos(accessCode),
  });

  const { mutate: addTodosMutation } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updateContentsMutation } = useMutation({
    mutationFn: updateContents,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updateOrderMutation } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updateCheckedMutation } = useMutation({
    mutationFn: updateChecked,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODOS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddTodos = (content: string) => addTodosMutation({ content, accessCode });
  const handleUpdateContents = (todoId: number, contents: string) => updateContentsMutation({ todoId, contents });
  const handleUpdateOrder = (todoId: number, order: number) => updateOrderMutation({ todoId, order });
  const handleUpdateChecked = (todoId: number) => updateCheckedMutation({ todoId });
  const handleDeleteTodo = (todoId: number) => deleteTodoMutation({ todoId });

  return {
    todos: data || [],
    handleAddTodos,
    handleUpdateContents,
    handleUpdateOrder,
    handleUpdateChecked,
    handleDeleteTodo,
  };
};

export default useTodos;

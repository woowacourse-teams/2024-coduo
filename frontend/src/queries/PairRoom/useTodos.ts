import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getTodos, addTodos, updateOrder } from '@/apis/todo';

const useTodos = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { data } = useQuery({
    queryKey: ['getTodos'],
    queryFn: () => getTodos(accessCode),
  });

  const { mutate: addTodosMutation } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updateOrderMutation } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddTodos = (content: string) => addTodosMutation({ content, accessCode });
  const handleUpdateOrder = (todoId: number, order: number) => updateOrderMutation({ todoId, order });

  return { todos: data || [], handleAddTodos, handleUpdateOrder };
};

export default useTodos;

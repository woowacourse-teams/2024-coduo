import { useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addTodos, updateOrder, updateChecked, updateContents, deleteTodo } from '@/apis/todo';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useMutateTodos = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

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

  return {
    addTodosMutation,
    updateContentsMutation,
    updateOrderMutation,
    updateCheckedMutation,
    deleteTodoMutation,
  };
};

export default useMutateTodos;

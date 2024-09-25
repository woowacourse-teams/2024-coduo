import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { getTodos, addTodos, updateOrder, updateChecked, updateContents, deleteTodo } from '@/apis/todo';

const useTodos = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['getTodos'],
    queryFn: () => getTodos(accessCode),
  });

  const { mutate: addTodosMutation } = useMutation({
    mutationFn: addTodos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
  });

  const { mutate: updateContentsMutation } = useMutation({
    mutationFn: updateContents,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
  });

  const { mutate: updateOrderMutation } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
  });

  const { mutate: updateCheckedMutation } = useMutation({
    mutationFn: updateChecked,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getTodos'] }),
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

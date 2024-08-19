import fetcher from '@/apis/fetcher';

const API_URL = process.env.REACT_APP_API_URL;

export interface Todo {
  id: number;
  content: string;
  isChecked: boolean;
  order: number;
}

export const getTodos = async (accessCode: string): Promise<Todo[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/api/${accessCode}/todos`,
    errorMessage: '',
  });

  return await response.json();
};

interface AddTodosRequest {
  content: string;
  accessCode: string;
}

export const addTodos = async ({ content, accessCode }: AddTodosRequest) => {
  await fetcher.post({
    url: `${API_URL}/api/${accessCode}/todos`,
    body: JSON.stringify({ content }),
    errorMessage: '',
  });
};

interface UpdateContentsRequest {
  todoId: number;
  contents: string;
}

export const updateContents = async ({ todoId, contents }: UpdateContentsRequest) => {
  await fetcher.patch({
    url: `${API_URL}/api/todos/${todoId}/contents`,
    body: JSON.stringify({ contents }),
    errorMessage: '',
  });
};

interface UpdateOrderRequest {
  todoId: number;
  order: number;
}

export const updateOrder = async ({ todoId, order }: UpdateOrderRequest) => {
  await fetcher.patch({
    url: `${API_URL}/api/todos/${todoId}/order`,
    body: JSON.stringify({ order }),
    errorMessage: '',
  });
};

interface UpdateCheckedRequest {
  todoId: number;
}

export const updateChecked = async ({ todoId }: UpdateCheckedRequest) => {
  await fetcher.patch({
    url: `${API_URL}/api/todos/${todoId}/checked`,
    errorMessage: '',
  });
};

interface DeleteTodoRequest {
  todoId: number;
}

export const deleteTodo = async ({ todoId }: DeleteTodoRequest) => {
  await fetcher.delete({
    url: `${API_URL}/api/todos/${todoId}`,
    errorMessage: '',
  });
};

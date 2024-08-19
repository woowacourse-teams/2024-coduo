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

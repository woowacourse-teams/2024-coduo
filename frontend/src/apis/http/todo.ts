import fetcher from '@/apis/http/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface Todo {
  id: number;
  content: string;
  isChecked: boolean;
  order: number;
}

export const getTodos = async (accessCode: string): Promise<Todo[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/todos`,
    errorMessage: ERROR_MESSAGES.GET_TODOS,
  });

  return await response.json();
};

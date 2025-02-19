import fetcher from '@/apis/http/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface GetCategoriesResponse {
  value: string;
  id: string;
}

export const getCategories = async (accessCode: string): Promise<GetCategoriesResponse[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/category`,
    errorMessage: ERROR_MESSAGES.GET_CATEGORIES,
  });

  return await response.json();
};

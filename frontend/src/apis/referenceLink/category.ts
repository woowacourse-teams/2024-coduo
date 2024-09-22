import fetcher from '@/apis/fetcher';

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

interface AddCategoryRequest {
  accessCode: string;
  category: string;
}
export const addCategory = async ({ category, accessCode }: AddCategoryRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/${accessCode}/category`,
    body: JSON.stringify({ value: category }),
    errorMessage: ERROR_MESSAGES.ADD_CATEGORY,
  });

  return await response.json();
};

interface DeleteCategoryRequest {
  accessCode: string;
  categoryId: string;
}

export const deleteCategory = async ({ categoryId, accessCode }: DeleteCategoryRequest) => {
  await fetcher.delete({
    url: `${API_URL}/${accessCode}/category/${categoryId}`,
  });
};

interface UpdateCategoryRequest {
  accessCode: string;
  previousCategoryId: string;
  updatedCategoryId: string;
}

export const updateCategory = async ({ previousCategoryId, updatedCategoryId, accessCode }: UpdateCategoryRequest) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/category`,
    body: JSON.stringify({ previousCategoryId, updatedCategoryId }),
  });
};

import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface CategoriesResponse {
  value: string;
  id: string;
}

export const getCategories = async (accessCode: string): Promise<CategoriesResponse[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/category`,
    errorMessage: ERROR_MESSAGES.GET_CATEGORIES,
  });

  return await response.json();
};

interface AddCategoryResponse {
  accessCode: string;
  category: string;
}
export const addCategory = async ({ accessCode, category }: AddCategoryResponse) => {
  const response = await fetcher.post({
    url: `${API_URL}/${accessCode}/category`,
    body: JSON.stringify({ value: category }),
    errorMessage: ERROR_MESSAGES.ADD_CATEGORY,
  });

  return await response.json();
};

interface DeleteCategoryResponse {
  accessCode: string;
  categoryName: string;
}

export const deleteCategory = async ({ categoryName, accessCode }: DeleteCategoryResponse) => {
  await fetcher.delete({
    url: `${API_URL}/${accessCode}/category/${categoryName}`,
  });
};

interface UpdateCategoryResponse {
  accessCode: string;
  previousCategoryName: string;
  updatedCategoryName: string;
}

export const updateCategory = async ({
  previousCategoryName,
  updatedCategoryName,
  accessCode,
}: UpdateCategoryResponse) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/category`,
    body: JSON.stringify({ previousCategoryName, updatedCategoryName }),
  });
};

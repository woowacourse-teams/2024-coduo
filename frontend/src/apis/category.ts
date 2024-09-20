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
  categoryName: string;
}

export const deleteCategory = async ({ categoryName, accessCode }: DeleteCategoryRequest) => {
  await fetcher.delete({
    url: `${API_URL}/${accessCode}/category/${categoryName}`,
  });
};

interface UpdateCategoryRequest {
  accessCode: string;
  previousCategoryName: string;
  updatedCategoryName: string;
}

export const updateCategory = async ({
  previousCategoryName,
  updatedCategoryName,
  accessCode,
}: UpdateCategoryRequest) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/category`,
    body: JSON.stringify({ previousCategoryName, updatedCategoryName }),
  });
};

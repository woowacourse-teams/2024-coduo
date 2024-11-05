import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getCategories, addCategory, updateCategory, deleteCategory } from '@/apis/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const DEFAULT_CATEGORY_ID = '0';
export const DEFAULT_CATEGORY_VALUE = '전체';

const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  value: DEFAULT_CATEGORY_VALUE,
};

const useCategory = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(accessCode),
    retry: false,
  });

  const { mutate: addCategoryMutation } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updateCategoryMutation } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '카테고리가 수정되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '카테고리가 삭제되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const isCategoryExist = (categoryName: string) => {
    return data ? data.map((category) => category.value).includes(categoryName) : false;
  };

  return {
    categories: [DEFAULT_CATEGORY, ...(data || [])],
    isCategoryExist,
    addCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};

export default useCategory;

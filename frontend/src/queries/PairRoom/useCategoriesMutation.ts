import { useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addCategory, updateCategory, deleteCategory } from '@/apis/http/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useCategoriesMutation = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

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

  return { addCategoryMutation, updateCategoryMutation, deleteCategoryMutation };
};

export default useCategoriesMutation;

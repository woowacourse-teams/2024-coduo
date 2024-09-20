import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { deleteCategory } from '@/apis/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { deleteCategoryMutation: mutate, isPending };
};

export default useDeleteCategory;

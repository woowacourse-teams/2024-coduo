import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCategory } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
  });

  return { deleteCategoryMutation: mutate, isPending };
};

export default useDeleteCategory;

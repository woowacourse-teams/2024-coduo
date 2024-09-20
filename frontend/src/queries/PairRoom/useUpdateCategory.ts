import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateCategory } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUpdateCategory = (reset: () => void) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] });
      reset();
    },
    onError: (error) => {
      reset();
      addToast({ status: 'ERROR', message: error.message });
    },
  });

  return { updateCategoryMutation: mutate, isPending };
};

export default useUpdateCategory;

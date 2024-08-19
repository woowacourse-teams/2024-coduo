import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addCategory } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useAddCategory = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { addCategory: mutate, isPending };
};

export default useAddCategory;

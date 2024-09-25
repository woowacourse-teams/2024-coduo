import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCategory } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useAddCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CATEGORIES] }),
  });

  return { addCategory: mutate, isPending };
};

export default useAddCategory;

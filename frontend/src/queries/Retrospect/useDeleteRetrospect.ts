import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { deleteRetrospectAnswer } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDeleteRetrospect = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteRetrospectAnswer,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_MY_RETROSPECTS] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

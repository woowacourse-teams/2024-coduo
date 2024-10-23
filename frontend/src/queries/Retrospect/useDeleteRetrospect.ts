import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { deleteRetrospectAnswer } from '@/apis/retrospect';

export const useDeleteRetrospect = (onSuccess?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteRetrospectAnswer,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

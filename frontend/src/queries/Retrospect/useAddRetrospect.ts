import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addRetrospect } from '@/apis/retrospect';

export const useAddRetrospect = (onSuccess?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: addRetrospect,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

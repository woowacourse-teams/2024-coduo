import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addReferenceLink, deleteReferenceLink } from '@/apis/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useAddReferenceLink = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

export const useDeleteReferenceLink = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: deleteReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });
};

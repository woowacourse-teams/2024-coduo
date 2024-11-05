import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { deleteRetrospectAnswer } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useDeleteRetrospect = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate: deleteRetrospectMutation } = useMutation({
    mutationFn: deleteRetrospectAnswer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_MY_RETROSPECTS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { deleteRetrospectMutation };
};

export default useDeleteRetrospect;

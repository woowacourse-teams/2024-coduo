import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addRetrospect, deleteRetrospect } from '@/apis/http/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useRetrospectMutation = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate: addRetrospectMutation } = useMutation({
    mutationFn: addRetrospect,
    onSuccess: () => addToast({ status: 'SUCCESS', message: '회고 작성이 완료되었습니다.' }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteRetrospectMutation } = useMutation({
    mutationFn: deleteRetrospect,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_MY_RETROSPECTS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { addRetrospectMutation, deleteRetrospectMutation };
};

export default useRetrospectMutation;

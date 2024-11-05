import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addRetrospect } from '@/apis/retrospect';

const useMutateRetrospect = () => {
  const { addToast } = useToastStore();

  const { mutate: addRetrospectMutation } = useMutation({
    mutationFn: addRetrospect,
    onSuccess: () => addToast({ status: 'SUCCESS', message: '회고 작성이 완료되었습니다.' }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { addRetrospectMutation };
};

export default useMutateRetrospect;

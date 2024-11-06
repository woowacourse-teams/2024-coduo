import { useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addReferenceLink, deleteReferenceLink } from '@/apis/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useMutateReferences = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate: addReferenceMutation } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '링크가 추가되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteReferenceMutation } = useMutation({
    mutationFn: deleteReferenceLink,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '링크가 삭제되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return {
    addReferenceMutation,
    deleteReferenceMutation,
  };
};

export default useMutateReferences;

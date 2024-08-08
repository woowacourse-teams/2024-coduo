import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getReferenceLinks, addReferenceLink, deleteReferenceLink } from '@/apis/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';


const useReferenceLinks = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { data: referenceLinks } = useQuery({
    queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS],
    queryFn: () => getReferenceLinks({ accessCode }),
  });

  const { mutate: addReferenceLinkMutate } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteReferenceLinkMutate } = useMutation({
    mutationFn: deleteReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return {
    referenceLinks: referenceLinks || [],
    addReferenceLink: addReferenceLinkMutate,
    deleteReferenceLink: deleteReferenceLinkMutate,
  };
};

export default useReferenceLinks;

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

  const { mutate: addReferenceLinkMutation } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deleteReferenceLinkMutation } = useMutation({
    mutationFn: deleteReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddReferenceLink = (url: string) => addReferenceLinkMutation({ url, accessCode });
  const handleDeleteReferenceLink = (id: number) => deleteReferenceLinkMutation({ id, accessCode });

  return {
    referenceLinks: referenceLinks || [],
    handleAddReferenceLink,
    handleDeleteReferenceLink,
  };
};

export default useReferenceLinks;

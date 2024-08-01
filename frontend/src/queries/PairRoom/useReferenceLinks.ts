import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { getReferenceLinks, addReferenceLink } from '@/apis/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useReferenceLinks = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { data: referenceLinks } = useQuery({
    queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS],
    queryFn: () => getReferenceLinks({ accessCode }),
  });

  const { mutate } = useMutation({
    mutationFn: addReferenceLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS] }),
    onError: (error) => alert(error.message),
  });

  return { referenceLinks: referenceLinks || [], addReferenceLink: mutate };
};

export default useReferenceLinks;

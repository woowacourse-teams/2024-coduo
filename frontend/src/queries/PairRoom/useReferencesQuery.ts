import { useQuery } from '@tanstack/react-query';

import { getReferenceLinks } from '@/apis/http/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useReferencesQuery = (categoryId: string, accessCode: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS, categoryId],
    queryFn: () => getReferenceLinks({ accessCode, categoryId }),
  });

  return { references: data };
};

export default useReferencesQuery;

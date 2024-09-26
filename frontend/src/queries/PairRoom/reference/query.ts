import { useQuery } from '@tanstack/react-query';

import { getReferenceLinks } from '@/apis/referenceLink';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetReference = (categoryId: string, accessCode: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_REFERENCE_LINKS, categoryId],
    queryFn: () => getReferenceLinks({ accessCode, categoryId }),
  });

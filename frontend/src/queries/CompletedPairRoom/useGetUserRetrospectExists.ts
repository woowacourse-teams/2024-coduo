import { useQuery } from '@tanstack/react-query';

import { getUserRetrospectExists } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetUserRetrospectExists = (accessCode: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_RETROSPECT_EXISTS],
    queryFn: () => getUserRetrospectExists({ accessCode }),
    enabled: !!accessCode,
  });

  return { data: data?.existRetrospect };
};

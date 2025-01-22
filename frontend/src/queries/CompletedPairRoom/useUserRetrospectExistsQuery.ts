import { useQuery } from '@tanstack/react-query';

import { getUserRetrospectExists } from '@/apis/http/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUserRetrospectExistsQuery = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_RETROSPECT_EXISTS],
    queryFn: () => getUserRetrospectExists(accessCode),
    enabled: !!accessCode,
  });

  return { isUserRetrospectExists: data?.existRetrospect, isUserRetrospectExistsFetching: isFetching };
};

export default useUserRetrospectExistsQuery;

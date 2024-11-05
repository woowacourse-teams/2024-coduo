import { useQuery } from '@tanstack/react-query';

import { getUserRetrospectExists } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetUserRetrospectExists = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_RETROSPECT_EXISTS],
    queryFn: () => getUserRetrospectExists(accessCode),
    enabled: !!accessCode,
  });

  return { isUserRetrospectExist: data?.existRetrospect, isUserRetrospectExistsFetching: isFetching };
};

export default useGetUserRetrospectExists;

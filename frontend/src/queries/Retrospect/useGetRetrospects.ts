import { useQuery } from '@tanstack/react-query';

import { getUserRetrospects } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetRetrospects = () => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_MY_RETROSPECTS],
    queryFn: getUserRetrospects,
    retry: false,
  });

  const myRetrospects = data?.retrospects;

  return { myRetrospects, myRetrospectLoading: isFetching };
};

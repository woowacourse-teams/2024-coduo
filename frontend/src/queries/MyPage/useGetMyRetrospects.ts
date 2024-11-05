import { useQuery } from '@tanstack/react-query';

import { getMyRetrospects } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetMyRetrospects = () => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_MY_RETROSPECTS],
    queryFn: getMyRetrospects,
    retry: false,
  });

  return { myRetrospects: data?.retrospects || [], isMyRetrospectsFetching: isFetching };
};

export default useGetMyRetrospects;

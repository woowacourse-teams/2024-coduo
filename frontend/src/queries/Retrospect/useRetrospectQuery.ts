import { useQuery } from '@tanstack/react-query';

import { getRetrospect } from '@/apis/http/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useRetrospectQuery = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_RETROSPECT_ANSWER],
    queryFn: () => getRetrospect(accessCode),
    retry: false,
  });

  return { answers: data?.answers || [], isFetching };
};

export default useRetrospectQuery;

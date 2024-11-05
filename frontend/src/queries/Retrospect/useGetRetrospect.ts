import { useQuery } from '@tanstack/react-query';

import { getRetrospectAnswers } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetRetrospect = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_RETROSPECT_ANSWER],
    queryFn: () => getRetrospectAnswers(accessCode),
    retry: false,
  });

  return { answers: data?.answers || [], isFetching };
};

export default useGetRetrospect;

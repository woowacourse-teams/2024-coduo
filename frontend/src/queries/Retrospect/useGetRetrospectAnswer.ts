import { useSuspenseQuery } from '@tanstack/react-query';

import { getRetrospectAnswer } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetRetrospectAnswer = (accessCode: string) => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_RETROSPECT_ANSWER],
    queryFn: () => getRetrospectAnswer({ accessCode }),
    retry: false,
  });

  const answers = data.answers;

  return { answers, isFetching };
};

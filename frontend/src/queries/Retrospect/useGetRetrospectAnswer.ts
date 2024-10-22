import { useSuspenseQuery } from '@tanstack/react-query';

import { getRetrospectAnswer } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetRetrospectAnswer = (retrospectId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_RETROSPECT_ANSWER],
    queryFn: () => getRetrospectAnswer({ retrospectId }),
    retry: false,
  });

  const { accessCode, answers } = data;

  return { accessCode, answers };
};

import { useSuspenseQuery } from '@tanstack/react-query';

import { getRetrospectAnswer } from '@/apis/retrospect';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetRetrospectAnswer = (retrospectId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_RETROSPECT_ANSWER],
    queryFn: () => getRetrospectAnswer({ retrospectId }),
    retry: false,
  });

  const { pairRoomAccessCode, answer } = data;

  return { accessCode: pairRoomAccessCode, answer };
};

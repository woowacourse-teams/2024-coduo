import { useQuery } from '@tanstack/react-query';

import { getUserIsInPairRoom } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetUserIsInPairRoom = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_IS_IN_PAIR_ROOM],
    queryFn: () => getUserIsInPairRoom({ accessCode }),
    enabled: !!accessCode,
  });

  return { isUserInPairRoom: data?.exists, isUserInPairRoomFetching: isFetching };
};

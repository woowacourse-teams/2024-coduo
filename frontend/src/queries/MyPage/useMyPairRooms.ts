import { useQuery } from '@tanstack/react-query';

import { getMyPairRooms } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useMyPairRooms = () => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_MY_PAIR_ROOMS],
    queryFn: getMyPairRooms,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { myPairRoomList: data, myPairRoomLoading: isFetching };
};

import { useQuery } from '@tanstack/react-query';

import { getMyPairRooms } from '@/apis/http/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useMyPairRoomsQuery = () => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_MY_PAIR_ROOMS],
    queryFn: getMyPairRooms,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { myPairRooms: data, isMyPairRoomsFetching: isFetching };
};

export default useMyPairRoomsQuery;

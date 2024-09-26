import { useQuery } from '@tanstack/react-query';

import { getMyPairRooms } from '@/apis/member';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useMyPairRooms = () => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_MY_PAIR_ROOMS],
    queryFn: getMyPairRooms,
    refetchOnWindowFocus: false,
  });

  return { data, isFetching };
};

export default useMyPairRooms;

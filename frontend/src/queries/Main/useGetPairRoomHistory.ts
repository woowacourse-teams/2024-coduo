import { useQuery } from '@tanstack/react-query';

import { getPairRoomHistory } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoomHistory = (accessCode: string) => {
  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM],
    queryFn: () => getPairRoomHistory(accessCode),
    enabled: !!accessCode,
  });

  return {
    driver: data?.driver || '',
    navigator: data?.navigator || '',
    timerDuration: data?.timerDuration || 0,
    isFetching,
  };
};

export default useGetPairRoomHistory;

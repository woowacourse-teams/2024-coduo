import { useQuery } from '@tanstack/react-query';

import { getPairRoom } from '@/apis/pairRoom';
import { getTimer } from '@/apis/timer';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoom = (accessCode: string) => {
  const {
    data: pairRoom,
    isFetching: isPairRoomFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM],
    queryFn: () => getPairRoom(accessCode),
    enabled: !!accessCode,
    refetchOnWindowFocus: false,
  });

  const { data: timer, isFetching: isTimerFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER],
    queryFn: () => getTimer(accessCode),
    enabled: !!accessCode,
    refetchOnWindowFocus: false,
  });

  return {
    driver: pairRoom?.driver || '',
    navigator: pairRoom?.navigator || '',
    duration: timer?.duration || 0,
    remainingTime: timer?.remainingTime || 0,
    isFetching: isPairRoomFetching || isTimerFetching,
    refetch,
  };
};

export default useGetPairRoom;

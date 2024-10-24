import { useQuery } from '@tanstack/react-query';

import { getPairRoom } from '@/apis/pairRoom';
import { getTimer } from '@/apis/timer';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoom = (accessCode: string) => {
  const {
    data: pairRoom,
    isFetching: isPairRoomFetching,
    isRefetching: isPairRoomReFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM],
    queryFn: () => getPairRoom(accessCode),
    enabled: !!accessCode,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const { data: timer, isFetching: isTimerFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER],
    queryFn: () => getTimer(accessCode),
    enabled: !!accessCode,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return {
    driver: pairRoom?.driver || '',
    navigator: pairRoom?.navigator || '',
    status: pairRoom?.status || '',
    missionUrl: pairRoom?.missionUrl || '',
    duration: timer?.duration || 0,
    remainingTime: timer?.remainingTime || 0,
    isFetching: (isPairRoomFetching && !isPairRoomReFetching) || isTimerFetching,
    refetch,
  };
};

export default useGetPairRoom;

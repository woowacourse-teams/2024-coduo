import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPairRoom } from '@/apis/pairRoom';
import { getTimer } from '@/apis/timer';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoom = (accessCode: string) => {
  const queryClient = useQueryClient();

  const {
    data: pairRoom,
    isFetching: isPairRoomFetching,
    isRefetching: isPairRoomReFetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM, accessCode],
    queryFn: () => getPairRoom(accessCode),
    refetchOnWindowFocus: false,
  });

  const { data: timer, isFetching: isTimerFetching } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER, accessCode],
    queryFn: () => getTimer(accessCode),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM, QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
  }, [accessCode]);

  return {
    driver: pairRoom?.driver || '',
    navigator: pairRoom?.navigator || '',
    status: pairRoom?.status || '',
    missionUrl: pairRoom?.missionUrl || '',
    duration: timer?.duration || 0,
    remainingTime: timer?.remainingTime || 0,
    isFetching: (isPairRoomFetching && !isPairRoomReFetching) || isTimerFetching,
  };
};

export default useGetPairRoom;

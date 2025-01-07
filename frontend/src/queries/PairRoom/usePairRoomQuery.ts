import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getPairRoom } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const usePairRoomQuery = (accessCode: string) => {
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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM, QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
  }, [accessCode]);

  return {
    driver: pairRoom?.driver || '',
    navigator: pairRoom?.navigator || '',
    status: pairRoom?.status || '',
    missionUrl: pairRoom?.missionUrl || '',
    duration: pairRoom?.duration || 0,
    remainingTime: pairRoom?.remainingTime || 0,
    isFetching: isPairRoomFetching && !isPairRoomReFetching,
  };
};

export default usePairRoomQuery;

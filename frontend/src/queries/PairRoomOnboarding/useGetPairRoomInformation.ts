import { useQuery } from '@tanstack/react-query';

import { getPairRoom } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoomInformation = (accessCode: string) => {
  const {
    data: pairNames,
    isFetching,
    isError,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_ROOM],
    queryFn: () => getPairRoom(accessCode),
    retry: 0,
    enabled: !!accessCode,
  });

  return {
    firstPair: pairNames?.firstPair || '',
    secondPair: pairNames?.secondPair || '',
    isSuccess,
    isError,
    isFetching,
    refetch,
  };
};

export default useGetPairRoomInformation;

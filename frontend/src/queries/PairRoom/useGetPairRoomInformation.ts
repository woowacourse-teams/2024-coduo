import { useQuery } from '@tanstack/react-query';

import { getPairNames } from '@/apis/pairName';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoomInformation = (accessCode: string) => {
  const {
    data: pairNames,
    isSuccess,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_NAMES],
    queryFn: () => getPairNames(accessCode),
    enabled: false,
  });

  return { pairNames: pairNames, isSuccess, isFetching, refetch };
};

export default useGetPairRoomInformation;

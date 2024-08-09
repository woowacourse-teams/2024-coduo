import { useQuery } from '@tanstack/react-query';

import { getPairNames } from '@/apis/pairName';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoomInformation = (accessCode: string) => {
  const {
    data: pairNames,
    isFetching,
    isError,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_NAMES],
    queryFn: () => getPairNames(accessCode),
    retry: 0,
    enabled: false,
  });

  return { pairNames: pairNames, isSuccess, isError, isFetching, refetch };
};

export default useGetPairRoomInformation;

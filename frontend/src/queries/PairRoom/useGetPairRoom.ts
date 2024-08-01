import { useQuery } from '@tanstack/react-query';

import { getPairNames } from '@/apis/pairName';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetPairRoom = (accessCode: string) => {
  const { data: pairNames } = useQuery({
    queryKey: [QUERY_KEYS.GET_PAIR_NAMES],
    queryFn: () => getPairNames(accessCode),
  });

  return { pairNames: pairNames };
};

export default useGetPairRoom;

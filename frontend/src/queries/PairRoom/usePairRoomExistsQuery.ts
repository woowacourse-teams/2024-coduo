import { useQuery } from '@tanstack/react-query';

import { getPairRoomExists } from '@/apis/http/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const usePairRoomExistsQuery = (accessCode: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_TODOS],
    queryFn: () => getPairRoomExists(accessCode),
  });

  return { exists: data?.exists ?? false };
};

export default usePairRoomExistsQuery;

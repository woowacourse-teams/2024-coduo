import { useQuery } from '@tanstack/react-query';

import { getRepositories } from '@/apis/github';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetRepositories = () => {
  const {
    data: repositories,
    isFetching,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_REPOSITORIES],
    queryFn: () => getRepositories(),
    refetchOnWindowFocus: false,
  });

  return { repositories, isFetching, error };
};

export default useGetRepositories;

import { useQuery } from '@tanstack/react-query';

import { getRepositories } from '@/apis/github';

import { QUERY_KEYS } from '@/constants/queryKeys';

const FILTER_KEYWORD = 'coduo';

const useGetRepositories = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_REPOSITORIES],
    queryFn: () => getRepositories(),
    refetchOnWindowFocus: false,
  });

  return { repositories: data?.filter((el) => el.name.startsWith(FILTER_KEYWORD)) || [], isFetching, error };
};

export default useGetRepositories;

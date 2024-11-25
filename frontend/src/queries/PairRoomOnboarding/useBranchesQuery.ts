import { useQuery } from '@tanstack/react-query';

import { getBranches } from '@/apis/github';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useBranchesQuery = (repositoryName: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_BRANCHES, repositoryName],
    queryFn: () => getBranches(repositoryName),
  });

  return { branches: data?.map((branch) => branch.name) || [] };
};

export default useBranchesQuery;

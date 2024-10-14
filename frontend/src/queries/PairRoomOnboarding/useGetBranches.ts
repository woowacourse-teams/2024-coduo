import { useQuery } from '@tanstack/react-query';

import { getBranches } from '@/apis/github';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetBranches = (repositoryName: string) => {
  const { data: branches } = useQuery({
    queryKey: [QUERY_KEYS.GET_BRANCHES, repositoryName],
    queryFn: () => getBranches(repositoryName),
  });

  return { branches: branches?.map((branch) => branch.name) || [] };
};

export default useGetBranches;

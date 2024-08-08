import { useQuery } from '@tanstack/react-query';

import { getBranches } from '@/apis/github';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetBranches = (repository: string) => {
  const {
    data: branches,
    isFetching,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BRANCHES, repository],
    queryFn: () => getBranches(repository),
  });

  interface BranchResponse {
    name: string;
  }

  const isAlreadyCreated = (branchName: string) => {
    const branchesName = branches?.map((branch: BranchResponse) => branch.name) || [];
    return branchesName.includes(branchName);
  };

  return { branches, isFetching, error, isAlreadyCreated };
};

export default useGetBranches;

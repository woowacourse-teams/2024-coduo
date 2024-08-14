import { useQuery } from '@tanstack/react-query';

import { getSignInGithub } from '@/apis/oauth';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useSignIn = () => {
  const { data, isLoading, error, isSuccess, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_SIGN_IN],
    queryFn: () => getSignInGithub(),
    enabled: false,
    retry: false,
  });

  return { data, isLoading, error, isSuccess, refetch };
};

export default useSignIn;

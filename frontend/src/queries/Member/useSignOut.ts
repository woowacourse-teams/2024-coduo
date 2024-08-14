import { useQuery } from '@tanstack/react-query';

import { getSignOut } from '@/apis/signOut';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useSignOut = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_SIGN_OUT],
    queryFn: getSignOut,
    enabled: false,
    retry: false,
  });

  return { data, isLoading, error, refetch };
};

export default useSignOut;

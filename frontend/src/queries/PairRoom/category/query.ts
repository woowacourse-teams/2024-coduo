import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/apis/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetCategories = (accessCode: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(accessCode),
    retry: 0,
  });

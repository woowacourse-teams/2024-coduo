import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetCategories = (accessCode: string) => {
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(accessCode),
    retry: 0,
  });

  const categories = data ? data.map((prop) => prop.value) : [];

  const isCategoryExist = (category: string) => categories.includes(category);

  return {
    categories,
    categoryRecord: data || [],
    isSuccess,
    isError,
    isFetching,
    isCategoryExist,
  };
};

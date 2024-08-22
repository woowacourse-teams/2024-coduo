import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/apis/referenceLink/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useGetCategories = (accessCode: string) => {
  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(accessCode),
    retry: 0,
  });

  const categories = data ? data.map((prop) => prop.value) : [];

  const isCategoryExist = (categoryName: string) =>
    categories.filter((category) => categoryName === category).length > 0;

  return {
    isCategoryExist,
    categories,
    categoryRecord: data || [],
    isSuccess,
    isError,
    isFetching,
  };
};

export default useGetCategories;

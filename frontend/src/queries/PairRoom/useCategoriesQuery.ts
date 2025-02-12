import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/apis/http/category';

import { QUERY_KEYS } from '@/constants/queryKeys';

export const DEFAULT_CATEGORY_ID = '0';
export const DEFAULT_CATEGORY_VALUE = '전체';

const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  value: DEFAULT_CATEGORY_VALUE,
};

const useCategoriesQuery = (accessCode: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: () => getCategories(accessCode),
    retry: false,
  });

  const isCategoryExist = (categoryName: string) => {
    return data ? data.map((category) => category.value).includes(categoryName) : false;
  };

  return { categories: [DEFAULT_CATEGORY, ...(data || [])], isCategoryExist };
};

export default useCategoriesQuery;

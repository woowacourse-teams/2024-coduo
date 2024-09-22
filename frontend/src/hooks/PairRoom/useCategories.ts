import { useGetCategories } from '@/queries/PairRoom/category/query';

export const DEFAULT_CATEGORY_ID = '0';
export const DEFAULT_CATEGORY_VALUE = '전체';

const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  value: DEFAULT_CATEGORY_VALUE,
};

const useCategories = (accessCode: string) => {
  const { data } = useGetCategories(accessCode);

  const categoryIdList = data?.map((category) => category.id);

  const isCategoryExist = (categoryId: string) => {
    if (!categoryIdList) return false;
    return categoryIdList.includes(categoryId);
  };

  const getCategoryNameById = (categoryId: string) => data?.find((category) => category.id === categoryId)?.value;

  const categories = [DEFAULT_CATEGORY, ...(data || [])];

  return {
    categories,
    isCategoryExist,
    getCategoryNameById,
  };
};

export default useCategories;

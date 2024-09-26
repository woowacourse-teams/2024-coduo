import { useGetCategories } from '@/queries/PairRoom/category/query';

export const DEFAULT_CATEGORY_ID = '0';
export const DEFAULT_CATEGORY_VALUE = '전체';

const DEFAULT_CATEGORY = {
  id: DEFAULT_CATEGORY_ID,
  value: DEFAULT_CATEGORY_VALUE,
};

const useCategories = (accessCode: string) => {
  const { data } = useGetCategories(accessCode);

  const categoryNameList = data?.map((category) => category.value);

  const isCategoryExist = (categoryName: string) => {
    if (!categoryNameList) return false;
    return categoryNameList.includes(categoryName);
  };

  const getCategoryNameById = (categoryId: string): string => {
    const category = data?.find((category) => category.id === categoryId);

    if (!category) {
      return '';
    }

    return category.value;
  };

  const categories = [DEFAULT_CATEGORY, ...(data || [])];

  return {
    categories,
    isCategoryExist,
    getCategoryNameById,
  };
};

export default useCategories;

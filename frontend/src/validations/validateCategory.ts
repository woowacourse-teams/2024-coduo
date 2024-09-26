import { InputStatus } from '@/components/common/Input/Input.type';

import { DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

const MAX_CATEGORY_NAME_LENGTH = 10;

export const validateCategory = (
  category: string,
  isCategoryExist: (categoryName: string) => boolean,
  prevCategoryName?: string,
) => {
  if (category.length > MAX_CATEGORY_NAME_LENGTH)
    return { status: 'ERROR' as InputStatus, message: `${MAX_CATEGORY_NAME_LENGTH}자 이하로 입력해주세요` };
  if (prevCategoryName === category)
    return { status: 'ERROR' as InputStatus, message: '이전과 동일한 카테고리 이름입니다. 다른 이름을 입력해주세요.' };

  if (isCategoryExist(category) || category === DEFAULT_CATEGORY_VALUE)
    return { status: 'ERROR' as InputStatus, message: '중복된 카테고리 입니다.' };

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

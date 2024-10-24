import { InputStatus } from '@/components/common/Input/Input.type';

import { DEFAULT_CATEGORY_VALUE } from '@/hooks/PairRoom/useCategories';

const MAX_CATEGORY_NAME_LENGTH = 10;

export const validateCategoryName = (
  categoryName: string,
  isCategoryNameExists: (categoryName: string) => boolean,
  prevCategoryName?: string,
) => {
  if (categoryName.length > MAX_CATEGORY_NAME_LENGTH) {
    return { status: 'ERROR' as InputStatus, message: `${MAX_CATEGORY_NAME_LENGTH}자 이하로 입력해주세요` };
  }

  if (prevCategoryName === categoryName) {
    return { status: 'ERROR' as InputStatus, message: '이전과 동일한 카테고리 이름입니다. 다른 이름을 입력해주세요.' };
  }

  if (isCategoryNameExists(categoryName) || categoryName === DEFAULT_CATEGORY_VALUE) {
    return { status: 'ERROR' as InputStatus, message: '중복된 카테고리 입니다.' };
  }

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

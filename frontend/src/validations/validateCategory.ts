import { InputStatus } from '@/components/common/Input/Input.type';

export const validateCategory = (category: string, isCategoryExist: (category: string) => boolean) => {
  if (category.length > 8) return { status: 'ERROR' as InputStatus, message: '8자 이하로 입력해주세요' };
  if (isCategoryExist(category)) return { status: 'ERROR' as InputStatus, message: '중복된 카테고리 입니다.' };

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

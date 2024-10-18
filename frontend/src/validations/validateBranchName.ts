import type { InputStatus } from '@/components/common/Input/Input.type';

export const validateBranchName = (name: string, branches: string[]) => {
  if (name.trim() === '') return { status: 'ERROR' as InputStatus, message: '값을 입력해 주세요.' };
  if (name.length > 30) return { status: 'ERROR' as InputStatus, message: '30자 이하로 입력해 주세요.' };
  if (branches.includes(name)) return { status: 'ERROR' as InputStatus, message: '중복된 브랜치 이름 입니다.' };

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

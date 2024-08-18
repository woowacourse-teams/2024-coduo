import type { InputStatus } from '@/components/common/Input/Input.type';

const validatePairName = (name: string, compareName?: string) => {
  if (name.length === 0) return { status: 'ERROR' as InputStatus, message: '값을 입력해주세요.' };
  if (name.length > 10)
    return { status: 'ERROR' as InputStatus, message: '이름(또는 닉네임)은 10자 이하로 입력해주세요.' };
  if (compareName === name) return { status: 'ERROR' as InputStatus, message: '중복된 이름(또는 닉네임)입니다. ' };
  return { status: 'DEFAULT' as InputStatus, message: '' };
};

export default validatePairName;

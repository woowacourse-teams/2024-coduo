import type { InputStatus } from '@/components/common/Input/Input.type';

export const validateName = (name: string) => {
  if (name.trim() === '') return { status: 'ERROR' as InputStatus, message: '값을 입력해 주세요.' };
  if (name.length > 10)
    return { status: 'ERROR' as InputStatus, message: '이름(또는 닉네임)은 10자 이하로 입력해 주세요.' };

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

export const validateDuplicateName = (firstPairName: string, secondPairName: string) => {
  if (firstPairName.trim() !== '' && secondPairName.trim() !== '' && firstPairName.trim() === secondPairName.trim())
    return { status: 'ERROR' as InputStatus, message: '중복된 이름(또는 닉네임)입니다. ' };

  return { status: 'DEFAULT' as InputStatus, message: '' };
};

export const validatePairInfo = (info: string) => {
  if (info.trim() === '') return { status: 'ERROR' as InputStatus, message: '값을 입력해 주세요.' };
  return { status: 'DEFAULT' as InputStatus, message: '' };
};

import { InputStatus } from '@/components/common/Input/Input.type';

import useInput from '@/hooks/common/useInput';

const usePairNameInputs = () => {
  const {
    value: firstPair,
    status: firstPairStatus,
    message: firstPairMessage,
    handleChange: onFirstPairChange,
    resetValue: resetFirstPair,
  } = useInput();

  const {
    value: secondPair,
    status: secondPairStatus,
    message: secondPairMessage,
    handleChange: onSecondPairChange,
    resetValue: resetSecondPair,
  } = useInput();

  const validatePairName = (name: string, compareName: string) => {
    if (name.length === 0) return { status: 'ERROR' as InputStatus, message: '값을 입력해주세요.' };
    if (name.length > 10) return { status: 'ERROR' as InputStatus, message: '페어 이름은 10자 이하로 입력해주세요.' };
    if (compareName === name) return { status: 'ERROR' as InputStatus, message: '중복된 페어 이름입니다. ' };
    return { status: 'DEFAULT' as InputStatus, message: '' };
  };

  const resetPairName = () => {
    resetFirstPair();
    resetSecondPair();
  };

  const handleFirstPair = (event: React.ChangeEvent<HTMLInputElement>) =>
    onFirstPairChange(event, validatePairName(event.target.value, secondPair));
  const handleSecondPair = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSecondPairChange(event, validatePairName(event.target.value, firstPair));

  return {
    firstPair: { value: firstPair, status: firstPairStatus, message: firstPairMessage },
    secondPair: { value: secondPair, status: secondPairStatus, message: secondPairMessage },
    handleFirstPair,
    handleSecondPair,
    resetPairName,
  };
};
export default usePairNameInputs;

import useInput from '@/hooks/useInput';

type InputStatus = 'default' | 'error' | 'success';

interface InitialValue {
  value: string;
  status: InputStatus;
  message: string;
}

const usePairNameInput = () => {
  const {
    inputValue: firstPairValue,
    handleOnChange: firstPairOnChange,
    resetInputValue: firstPairValueReset,
  } = useInput<InitialValue>({
    value: '',
    status: 'default',
    message: '',
  });
  const {
    inputValue: secondPairValue,
    handleOnChange: secondPairOnChange,
    resetInputValue: secondPairValueReset,
  } = useInput<InitialValue>({
    value: '',
    status: 'default',
    message: '',
  });

  const resetPairNameValue = () => {
    firstPairValueReset();
    secondPairValueReset();
  };

  const validatePairName = (name: string) => {
    if (name.length === 0) return { status: 'default', message: '' };
    if (name.length > 10) return { status: 'error', message: '페어 이름은 10자 이하로 입력해주세요.' };

    return {
      status: 'success',
      message: '알맞은 이름 입니다!',
    };
  };

  const firstPairValidateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    firstPairOnChange(event, validatePairName);
  };
  const secondPairValidateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    secondPairOnChange(event, validatePairName);
  };
  const isButtonActive = firstPairValue.status === 'success' && secondPairValue.status === 'success';

  const getPairNameValue = { firstPairName: firstPairValue.value, secondPairName: secondPairValue.value };

  return {
    firstPairValidateOnChange,
    secondPairValidateOnChange,
    resetPairNameValue,
    isButtonActive,
    getPairNameValue,
    firstPairValue,
    secondPairValue,
  };
};
export default usePairNameInput;

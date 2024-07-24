import useInput from '@/hooks/useInput';

type InputStatus = 'default' | 'error' | 'success';

interface InitialValue {
  value: string;
  status: InputStatus;
  message: string;
}

const usePairNameInputs = () => {
  const {
    inputValue: firstPair,
    handleOnChange: firstPairOnChange,
    resetInputValue: firstPairValueReset,
  } = useInput<InitialValue>({
    value: '',
    status: 'default',
    message: '',
  });
  const {
    inputValue: secondPair,
    handleOnChange: secondPairOnChange,
    resetInputValue: secondPairValueReset,
  } = useInput<InitialValue>({
    value: '',
    status: 'default',
    message: '',
  });

  const resetPairName = () => {
    firstPairValueReset();
    secondPairValueReset();
  };

  const validatePairName = (name: string) => {
    if (name.length === 0) return { status: 'error', message: '값을 입력해주세요.' };
    if (name.length > 10) return { status: 'error', message: '페어이름은 10자 이하로 입력해주세요.' };

    return {
      status: 'default',
      message: '',
    };
  };

  const handleFirstPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    firstPairOnChange(event, validatePairName);
  };
  const handleSecondPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    secondPairOnChange(event, validatePairName);
  };
  const isButtonActive =
    firstPair.status !== 'error' &&
    secondPair.status !== 'error' &&
    firstPair.value.length !== 0 &&
    secondPair.value.length !== 0;

  return {
    handleFirstPair,
    handleSecondPair,
    resetPairName,
    isButtonActive,
    firstPair,
    secondPair,
  };
};
export default usePairNameInputs;

import useInput from '@/hooks/common/useInput';

type InputStatus = 'DEFAULT' | 'ERROR' | 'SUCCESS';

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
    status: 'DEFAULT',
    message: '',
  });
  const {
    inputValue: secondPair,
    handleOnChange: secondPairOnChange,
    resetInputValue: secondPairValueReset,
  } = useInput<InitialValue>({
    value: '',
    status: 'DEFAULT',
    message: '',
  });

  const resetPairName = () => {
    firstPairValueReset();
    secondPairValueReset();
  };

  const validatePairName = (name: string) => {
    if (name.length === 0) return { status: 'ERROR', message: '값을 입력해주세요.' };
    if (name.length > 10) return { status: 'ERROR', message: '페어이름은 10자 이하로 입력해주세요.' };

    return {
      status: 'DEFAULT',
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
    firstPair.status !== 'ERROR' &&
    secondPair.status !== 'ERROR' &&
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

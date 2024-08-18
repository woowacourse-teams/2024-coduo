import validatePairName from '@/validations/common/validatePairName';

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

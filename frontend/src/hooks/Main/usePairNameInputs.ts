import validatePairName from '@/validations/common/validatePairName';

import useInput from '@/hooks/common/useInput';

const usePairNameInputs = () => {
  const {
    value: firstPairName,
    status: firstPairNameStatus,
    message: firstPairNameMessage,
    handleChange: onFirstPairNameChange,
  } = useInput();

  const {
    value: secondPairName,
    status: secondPairNameStatus,
    message: secondPairNameMessage,
    handleChange: onSecondPairNameChange,
  } = useInput();

  const handleFirstPairName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onFirstPairNameChange(event, validatePairName(event.target.value, secondPairName));

  const handleSecondPairName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSecondPairNameChange(event, validatePairName(event.target.value, firstPairName));

  const isPairNameValid =
    firstPairName !== '' &&
    secondPairName !== '' &&
    firstPairNameStatus !== 'ERROR' &&
    secondPairNameStatus !== 'ERROR';

  return {
    firstPairName: { value: firstPairName, status: firstPairNameStatus, message: firstPairNameMessage },
    secondPairName: { value: secondPairName, status: secondPairNameStatus, message: secondPairNameMessage },
    isPairNameValid,
    handleFirstPairName,
    handleSecondPairName,
  };
};
export default usePairNameInputs;

import { validateBranchName } from '@/validations/validateBranchName';

import useInput from '@/hooks/common/useInput';

const useMissionBranch = () => {
  const { value, status, message, handleChange, resetValue } = useInput();

  const isValidBranchName = status === 'DEFAULT' && value !== '' && value.length <= 30;

  const handleBranchName = (event: React.ChangeEvent<HTMLInputElement>, existingBranches: string[]) =>
    handleChange(event, validateBranchName(event.target.value, existingBranches));

  return {
    branchName: { value, status, message },
    isValidBranchName,
    resetBranchName: resetValue,
    handleBranchName,
  };
};

export default useMissionBranch;

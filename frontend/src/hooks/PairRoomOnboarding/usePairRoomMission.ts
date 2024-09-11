import { useState } from 'react';

import { validateBranchName } from '@/validations/validateBranchName';

import useInput from '@/hooks/common/useInput';

const usePairRoomMission = () => {
  const [repositoryName, setRepositoryName] = useState('');

  const { value, status, message, handleChange, resetValue } = useInput();

  const isValidRepositoryName = repositoryName !== '';
  const isValidBranchName = status === 'DEFAULT' && value !== '';

  const handleRepositoryName = (name: string) => {
    setRepositoryName(name);
    resetValue();
  };

  const handleBranchName = (event: React.ChangeEvent<HTMLInputElement>, branches: string[]) =>
    handleChange(event, validateBranchName(event.target.value, branches));

  return {
    repositoryName,
    branchName: { value, status, message },
    isValidRepositoryName,
    isValidBranchName,
    handleRepositoryName,
    handleBranchName,
  };
};

export default usePairRoomMission;

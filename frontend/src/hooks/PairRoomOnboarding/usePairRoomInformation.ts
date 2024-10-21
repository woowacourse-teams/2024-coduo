import { useState } from 'react';

import { InputType, InputStatus } from '@/components/common/Input/Input.type';

import useUserStore from '@/stores/userStore';

import { validateName, validateDuplicateName } from '@/validations/validatePairName';
import { validateTimerDuration } from '@/validations/validateTimerDuration';

export type Role = 'DRIVER' | 'NAVIGATOR';

const usePairRoomInformation = () => {
  const { username, userStatus } = useUserStore();

  const [firstPairName, setFirstPairName] = useState<InputType>({
    value: userStatus === 'SIGNED_IN' ? username : '',
    status: 'DEFAULT' as InputStatus,
    message: '',
  });
  const [secondPairName, setSecondPairName] = useState<InputType>({
    value: '',
    status: 'DEFAULT' as InputStatus,
    message: '',
  });

  const [pairId, setPairId] = useState('');
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timerDuration, setTimerDuration] = useState('');

  const isPairNameValid =
    firstPairName.value !== '' &&
    secondPairName.value !== '' &&
    firstPairName.status !== 'ERROR' &&
    secondPairName.status !== 'ERROR';

  const isPairRoleValid = driver !== '' && navigator !== '';
  const isTimerDurationValid = timerDuration !== '' && validateTimerDuration(timerDuration);

  const handlePairName = (firstPairName: string, secondPairName: string) => {
    const isValidFirstPairName = validateName(firstPairName);
    const isValidSecondPairName = validateName(secondPairName);

    const isDuplicateName = validateDuplicateName(firstPairName, secondPairName);

    setFirstPairName({
      value: firstPairName,
      status: isValidFirstPairName.status !== 'ERROR' ? isDuplicateName.status : isValidFirstPairName.status,
      message: isValidFirstPairName.status !== 'ERROR' ? isDuplicateName.message : isValidFirstPairName.message,
    });

    setSecondPairName({
      value: secondPairName,
      status: isValidSecondPairName.status !== 'ERROR' ? isDuplicateName.status : isValidSecondPairName.status,
      message: isValidSecondPairName.status !== 'ERROR' ? isDuplicateName.message : isValidSecondPairName.message,
    });
  };

  const handleFirstPairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (firstPairName.value === driver || firstPairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handlePairName(event.target.value, secondPairName.value);
  };

  const handleSecondPairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (secondPairName.value === driver || secondPairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handlePairName(firstPairName.value, event.target.value);
  };

  const handlePairData = (pairId: string, pairName: string) => {
    setPairId(pairId);
    setSecondPairName((prev) => ({ ...prev, value: pairName }));
  };

  const handlePairRole = (pairName: string, role: Role) => {
    const otherPair = firstPairName.value === pairName ? secondPairName.value : firstPairName.value;

    if (role === 'DRIVER') {
      setDriver(pairName);
      setNavigator(otherPair);
    } else {
      setDriver(otherPair);
      setNavigator(pairName);
    }
  };

  const handleTimerDuration = (timerDuration: string) => setTimerDuration(timerDuration);

  return {
    firstPairName,
    secondPairName,
    pairId,
    driver,
    navigator,
    timerDuration,
    isPairNameValid,
    isPairRoleValid,
    isTimerDurationValid,
    handleFirstPairName,
    handleSecondPairName,
    handlePairData,
    handlePairRole,
    handleTimerDuration,
  };
};

export default usePairRoomInformation;

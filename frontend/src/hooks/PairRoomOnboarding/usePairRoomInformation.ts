import { useState } from 'react';

import { validatePairName } from '@/validations/validatePairName';
import { validateTimerDuration } from '@/validations/validateTimerDuration';

import useInput from '@/hooks/common/useInput';

export type Role = 'DRIVER' | 'NAVIGATOR';

const usePairRoomInformation = () => {
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timerDuration, setTimerDuration] = useState('');

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

  const isPairNameValid =
    firstPairName !== '' &&
    secondPairName !== '' &&
    firstPairNameStatus !== 'ERROR' &&
    secondPairNameStatus !== 'ERROR';

  const isPairRoleValid = driver !== '' && navigator !== '';

  const isTimerDurationValid = timerDuration !== '' && validateTimerDuration(timerDuration);

  const handleFirstPairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (firstPairName === driver || firstPairName === navigator) {
      setDriver('');
      setNavigator('');
    }

    onFirstPairNameChange(event, validatePairName(event.target.value, secondPairName));
  };

  const handleSecondPairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (secondPairName === driver || secondPairName === navigator) {
      setDriver('');
      setNavigator('');
    }

    onSecondPairNameChange(event, validatePairName(event.target.value, firstPairName));
  };

  const handlePairRole = (pairName: string, role: Role) => {
    const otherPair = firstPairName === pairName ? secondPairName : firstPairName;

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
    firstPairName: { value: firstPairName, status: firstPairNameStatus, message: firstPairNameMessage },
    secondPairName: { value: secondPairName, status: secondPairNameStatus, message: secondPairNameMessage },
    driver,
    navigator,
    timerDuration,
    isPairNameValid,
    isPairRoleValid,
    isTimerDurationValid,
    handleFirstPairName,
    handleSecondPairName,
    handlePairRole,
    handleTimerDuration,
  };
};

export default usePairRoomInformation;

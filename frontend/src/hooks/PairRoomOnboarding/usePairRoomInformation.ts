import { useState } from 'react';

import { InputType, InputStatus } from '@/components/common/Input/Input.type';

import useUserStore from '@/stores/userStore';

import { validateName, validateDuplicateName } from '@/validations/validatePairName';
import { validateTimerDuration } from '@/validations/validateTimerDuration';

export type Role = 'DRIVER' | 'NAVIGATOR';

const usePairRoomInformation = () => {
  const { username, userStatus } = useUserStore();

  const [userPairName, setUserPairName] = useState<InputType>({
    value: userStatus === 'SIGNED_IN' ? username : '',
    status: 'DEFAULT' as InputStatus,
    message: '',
  });

  const [pairName, setPairName] = useState<InputType>({
    value: '',
    status: 'DEFAULT' as InputStatus,
    message: '',
  });

  const [pairId, setPairId] = useState('');
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timerDuration, setTimerDuration] = useState('');

  const isPairRoomNameValid =
    userPairName.value !== '' &&
    pairName.value !== '' &&
    userPairName.status !== 'ERROR' &&
    pairName.status !== 'ERROR';

  const isPairRoleValid = driver !== '' && navigator !== '';
  const isTimerDurationValid = timerDuration !== '' && validateTimerDuration(timerDuration);

  const handlePairRoomName = (userPairName: string, pairName: string) => {
    const isValidUserPairName = validateName(userPairName);
    const isValidPairName = validateName(pairName);

    const isDuplicateName = validateDuplicateName(userPairName, pairName);

    setUserPairName({
      value: userPairName,
      status: isValidUserPairName.status !== 'ERROR' ? isDuplicateName.status : isValidUserPairName.status,
      message: isValidUserPairName.status !== 'ERROR' ? isDuplicateName.message : isValidUserPairName.message,
    });

    setPairName({
      value: pairName,
      status: isValidPairName.status !== 'ERROR' ? isDuplicateName.status : isValidPairName.status,
      message: isValidPairName.status !== 'ERROR' ? isDuplicateName.message : isValidPairName.message,
    });
  };

  const handleUserPairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userPairName.value === driver || userPairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handlePairRoomName(event.target.value, pairName.value);
  };

  const handlePairName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pairName.value === driver || pairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handlePairRoomName(userPairName.value, event.target.value);
  };

  const handlePairData = (pairId: string, pairName: string) => {
    setPairId(pairId);
    handlePairRoomName(userPairName.value, pairName);
  };

  const handlePairRole = (name: string, role: Role) => {
    const otherPair = userPairName.value === name ? pairName.value : userPairName.value;

    if (role === 'DRIVER') {
      setDriver(name);
      setNavigator(otherPair);
    } else {
      setDriver(otherPair);
      setNavigator(name);
    }
  };

  const handleTimerDuration = (timerDuration: string) => setTimerDuration(timerDuration);

  return {
    userPairName,
    pairId,
    pairName,
    driver,
    navigator,
    timerDuration,
    isPairRoomNameValid,
    isPairRoleValid,
    isTimerDurationValid,
    handleUserPairName,
    handlePairName,
    handlePairData,
    handlePairRole,
    handleTimerDuration,
  };
};

export default usePairRoomInformation;

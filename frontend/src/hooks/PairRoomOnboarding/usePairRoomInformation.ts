import { useState, useEffect } from 'react';

import type { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

const usePairRoomInformation = (firstPair: string, secondPair: string) => {
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timer, setTimer] = useState('');

  const handleRole = (driver: string, navigator: string) => {
    setDriver(driver);
    setNavigator(navigator);
  };

  useEffect(() => {
    if (firstPair !== '' && secondPair !== '') handleRole(firstPair, secondPair);
  }, [firstPair, secondPair]);

  const handleRoleSelect = (name: string, role: Role) => {
    if (!firstPair || !secondPair) return;

    const otherPair = firstPair === name ? secondPair : firstPair;

    switch (role) {
      case 'DRIVER':
        handleRole(name, otherPair);
        return;
      case 'NAVIGATOR':
        handleRole(otherPair, name);
        return;
    }
  };

  const handleTimer = (timer: string) => setTimer(timer);

  return { driver, navigator, timer, handleRole, handleRoleSelect, handleTimer };
};

export default usePairRoomInformation;

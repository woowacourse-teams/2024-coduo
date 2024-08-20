import { useState } from 'react';

import { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerInput from '@/components/PairRoomOnboarding/TimerInput/TimerInput';

import usePairNameInputs from '@/hooks/Main/usePairNameInputs';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const { firstPairName, secondPairName, handleFirstPairName, handleSecondPairName } = usePairNameInputs();

  const validationList = [
    firstPairName.value !== '' &&
      secondPairName.value !== '' &&
      firstPairName.status !== 'ERROR' &&
      secondPairName.status !== 'ERROR',
    driver !== '' && navigator !== '',
  ];

  const { moveIndex } = useAutoMoveIndex(0, validationList);

  const handleFirstPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (firstPairName.value === driver || firstPairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handleFirstPairName(event);
  };

  const handleSecondPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (secondPairName.value === driver || secondPairName.value === navigator) {
      setDriver('');
      setNavigator('');
    }

    handleSecondPairName(event);
  };

  const handleRole = (pairName: string, role: Role) => {
    const otherPair = firstPairName.value === pairName ? secondPairName.value : firstPairName.value;

    if (role === 'DRIVER') {
      setDriver(pairName);
      setNavigator(otherPair);
    } else {
      setDriver(otherPair);
      setNavigator(pairName);
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.Title>그냥 시작하기</S.Title>
        {/* {step === 'MISSION' && <StartMission handleStartMission={handleStartMission} />} */}
        <PairNameInput
          firstPairName={firstPairName}
          secondPairName={secondPairName}
          onFirstPair={handleFirstPair}
          onSecondPair={handleSecondPair}
        />
        {moveIndex >= 1 && (
          <PairRoleInput
            firstPair={firstPairName.value}
            secondPair={secondPairName.value}
            driver={driver}
            navigator={navigator}
            onRole={handleRole}
          />
        )}
        {moveIndex >= 2 && <TimerInput />}
        <S.ButtonWrapper>
          <Button>{BUTTON_TEXT.COMPLETE}</Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

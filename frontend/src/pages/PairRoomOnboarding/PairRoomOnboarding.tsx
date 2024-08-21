import { useState } from 'react';

import { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import usePairNameInputs from '@/hooks/Main/usePairNameInputs';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timerDuration, setTimerDuration] = useState('');

  const { firstPairName, secondPairName, isPairNameValid, handleFirstPairName, handleSecondPairName } =
    usePairNameInputs();

  const validationList = [isPairNameValid, driver !== '' && navigator !== '', timerDuration !== ''];
  const { moveIndex } = useAutoMoveIndex(0, validationList, isTyping);

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

  const handleTimerDuration = (timerDuration: string) => setTimerDuration(timerDuration);

  return (
    <S.Layout>
      <S.Container>
        <S.Title>그냥 시작하기</S.Title>
        <S.InputContainer>
          <PairNameInput
            firstPairName={firstPairName}
            secondPairName={secondPairName}
            onFirstPair={handleFirstPair}
            onSecondPair={handleSecondPair}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
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
          {moveIndex >= 2 && <TimerDurationInput timerDuration={timerDuration} onTimerDuration={handleTimerDuration} />}
          <S.ButtonWrapper>
            <Button disabled={validationList.some((valid) => !valid)}>{BUTTON_TEXT.COMPLETE}</Button>
          </S.ButtonWrapper>
        </S.InputContainer>
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

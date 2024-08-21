import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import MissionSelectInput from '@/components/PairRoomOnboarding/MissionSelectInput/MissionSelectInput';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useCreateBranch from '@/queries/PairRoomOnboarding/useCreateBranch';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mission = searchParams.get('mission');

  const [isTyping, setIsTyping] = useState(false);

  const {
    firstPairName,
    secondPairName,
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
  } = usePairRoomInformation();

  const { handleCreateBranch } = useCreateBranch();

  const validationList = [isPairNameValid, isPairRoleValid, isTimerDurationValid];

  const { moveIndex } = useAutoMoveIndex(0, validationList, isTyping);

  return (
    <S.Layout>
      <S.Container>
        <S.Title>{mission === 'true' ? '미션과 함께 시작하기' : '그냥 시작하기'}</S.Title>
        {mission === 'true' && <MissionSelectInput onCreateBranch={handleCreateBranch} />}
        <S.InputContainer>
          <PairNameInput
            firstPairName={firstPairName}
            secondPairName={secondPairName}
            onFirstPair={handleFirstPairName}
            onSecondPair={handleSecondPairName}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
          />
          {moveIndex >= 1 && (
            <PairRoleInput
              firstPair={firstPairName.value}
              secondPair={secondPairName.value}
              driver={driver}
              navigator={navigator}
              onRole={handlePairRole}
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

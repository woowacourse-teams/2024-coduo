import { useLocation } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import MissionSelectInput from '@/components/PairRoomOnboarding/MissionSelectInput/MissionSelectInput';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import useDebounce from '@/hooks/common/useDebounce';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useAddPairRoom from '@/queries/Main/useAddPairRoom';
import useCreateBranch from '@/queries/PairRoomOnboarding/useCreateBranch';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomOnboarding.styles';

const PairRoomOnboarding = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mission = searchParams.get('mission');

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

  const { handleCreateBranch, isSuccess: isCreateBranchSuccess } = useCreateBranch();
  const { handleAddPairRoom } = useAddPairRoom();

  const handleSuccess = () =>
    handleAddPairRoom(firstPairName.value, secondPairName.value, driver, navigator, timerDuration);

  const validationList = [useDebounce(isPairNameValid, 500), isPairRoleValid, isTimerDurationValid];

  const { moveIndex } = useAutoMoveIndex(0, validationList);

  return (
    <S.Layout>
      <S.Container>
        <S.Title>{mission === 'true' ? '미션과 함께 시작하기' : '그냥 시작하기'}</S.Title>
        {mission === 'true' && !isCreateBranchSuccess && <MissionSelectInput onCreateBranch={handleCreateBranch} />}
        {((mission === 'true' && isCreateBranchSuccess) || mission === 'false') && (
          <S.InputContainer>
            <PairNameInput
              firstPairName={firstPairName}
              secondPairName={secondPairName}
              onFirstPair={handleFirstPairName}
              onSecondPair={handleSecondPairName}
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
            {moveIndex >= 2 && (
              <TimerDurationInput timerDuration={timerDuration} onTimerDuration={handleTimerDuration} />
            )}
            {moveIndex >= 3 && (
              <S.ButtonWrapper>
                <Button disabled={validationList.some((valid) => !valid)} onClick={handleSuccess}>
                  {BUTTON_TEXT.COMPLETE}
                </Button>
              </S.ButtonWrapper>
            )}
          </S.InputContainer>
        )}
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

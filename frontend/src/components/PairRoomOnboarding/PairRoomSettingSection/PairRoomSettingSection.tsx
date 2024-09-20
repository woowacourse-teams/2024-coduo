import Button from '@/components/common/Button/Button';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import useDebounce from '@/hooks/common/useDebounce';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useAddPairRoom from '@/queries/Main/useAddPairRoom';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './PairRoomSettingSection.styles';

const PairRoomSettingSection = () => {
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

  const validationList = [useDebounce(isPairNameValid, 500), isPairRoleValid, isTimerDurationValid];

  const { moveIndex } = useAutoMoveIndex(0, validationList);

  const { handleAddPairRoom } = useAddPairRoom();

  const handleSuccess = () => handleAddPairRoom(driver, navigator, timerDuration);

  return (
    <S.Layout>
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
      {moveIndex >= 2 && <TimerDurationInput timerDuration={timerDuration} onTimerDuration={handleTimerDuration} />}
      {moveIndex >= 3 && (
        <S.ButtonWrapper>
          <Button disabled={validationList.some((valid) => !valid)} onClick={handleSuccess}>
            {BUTTON_TEXT.COMPLETE}
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Layout>
  );
};

export default PairRoomSettingSection;

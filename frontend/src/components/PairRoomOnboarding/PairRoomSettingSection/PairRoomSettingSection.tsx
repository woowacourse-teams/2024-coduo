import Button from '@/components/common/Button/Button';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import useDebounce from '@/hooks/common/useDebounce';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useAddPairRoom from '@/queries/Main/useAddPairRoom';

import * as S from './PairRoomSettingSection.styles';

interface PairRoomSettingSectionProps {
  repositoryName: string;
}

const PairRoomSettingSection = ({ repositoryName }: PairRoomSettingSectionProps) => {
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

  const handleSuccess = () => {
    const missionUrl = repositoryName !== '' ? `https://github.com/coduo-missions/${repositoryName}` : '';
    handleAddPairRoom(driver, navigator, missionUrl, timerDuration);
  };

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
            완료
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Layout>
  );
};

export default PairRoomSettingSection;

import Button from '@/components/common/Button/Button';
import AddPairModal from '@/components/PairRoomOnboarding/AddPairModal/AddPairModal';
import PairNameInput from '@/components/PairRoomOnboarding/PairNameInput/PairNameInput';
import PairRoleInput from '@/components/PairRoomOnboarding/PairRoleInput/PairRoleInput';
import TimerDurationInput from '@/components/PairRoomOnboarding/TimerDurationInput/TimerDurationInput';

import useDebounce from '@/hooks/common/useDebounce';
import useModal from '@/hooks/common/useModal';
import useAutoMoveIndex from '@/hooks/PairRoomOnboarding/useAutoMoveIndex';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useAddPairRoom from '@/queries/Main/useAddPairRoom';

import * as S from './PairRoomSettingSection.styles';

interface PairRoomSettingSectionProps {
  repositoryName: string;
}

const PairRoomSettingSection = ({ repositoryName }: PairRoomSettingSectionProps) => {
  const {
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
  } = usePairRoomInformation();

  const validationList = [useDebounce(isPairRoomNameValid, 500), isPairRoleValid, isTimerDurationValid];

  const { moveIndex } = useAutoMoveIndex(0, validationList);
  const { isModalOpen, openModal, closeModal } = useModal();

  const { handleAddPairRoom } = useAddPairRoom();

  const handleSuccess = () => {
    const missionUrl = repositoryName !== '' ? `https://github.com/coduo-missions/${repositoryName}` : '';
    handleAddPairRoom(pairId, driver, navigator, missionUrl, timerDuration);
  };

  return (
    <S.Layout>
      <PairNameInput
        userPairName={userPairName}
        pairId={pairId}
        pairName={pairName}
        onUserPairName={handleUserPairName}
        onPairName={handlePairName}
        openAddPairModal={openModal}
      />
      <AddPairModal isOpen={isModalOpen} closeModal={closeModal} onPairData={handlePairData} />
      {moveIndex >= 1 && (
        <PairRoleInput
          userPairName={userPairName.value}
          pairName={pairName.value}
          driver={driver}
          navigator={navigator}
          onPairRole={handlePairRole}
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

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';
import HowToPairModal from '@/components/PairRoomOnboarding/HowToPairModal/HowToPairModal';
import ProgressBar from '@/components/PairRoomOnboarding/ProgressBar/ProgressBar';
import RoleSelection from '@/components/PairRoomOnboarding/RoleSelection/RoleSelection';
import TimerSelection from '@/components/PairRoomOnboarding/TimerSelection/TimerSelection';

import useModal from '@/hooks/common/useModal';

import useAddTimer from '@/queries/PairRoomOnboarding/useAddTimer';
import useGetPairRoomInformation from '@/queries/PairRoomOnboarding/useGetPairRoomInformation';

import * as S from './PairRoomOnboarding.styles';
import type { Step } from './PairRoomOnboarding.type';

const PairRoomOnboarding = () => {
  const [step, setStep] = useState<Step>('ROLE');

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const navigate = useNavigate();
  const { accessCode } = useParams();

  const { firstPair, secondPair, isFetching } = useGetPairRoomInformation(accessCode || '');
  const { isModalOpen: isHowToPairModalOpen, closeModal: closeHowToPairModal } = useModal(false);

  const handleSuccess = () => {
    navigate(`/room/${accessCode}`, { state: { driver, navigator } });
  };

  const { handleAddTimer, isPending } = useAddTimer(handleSuccess);

  const handleBack = () => {
    if (step === 'TIMER') {
      setStep('ROLE');
    }
  };

  const handleRoleSelection = (driver: string, navigator: string) => {
    setDriver(driver);
    setNavigator(navigator);

    setStep('TIMER');
  };

  const handleTimerSelection = (timer: string) => {
    handleAddTimer({ timer, accessCode: accessCode || '' });
  };

  if (isFetching || isPending) {
    return (
      <S.Layout>
        <Spinner />
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <S.Container>
        <ProgressBar step={step} />
        {/* {step === 'MISSION' && <StartMission handleStartMission={handleStartMission} />} */}
        {step === 'ROLE' && (
          <RoleSelection firstPair={firstPair} secondPair={secondPair} onNext={handleRoleSelection} />
        )}
        {step === 'TIMER' && <TimerSelection onPrev={handleBack} onNext={handleTimerSelection} />}
      </S.Container>
      <HowToPairModal isOpen={isHowToPairModalOpen} closeModal={closeHowToPairModal} />
    </S.Layout>
  );
};

export default PairRoomOnboarding;

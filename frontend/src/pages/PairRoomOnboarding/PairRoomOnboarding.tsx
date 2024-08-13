import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';
import HowToPairModal from '@/components/PairRoomOnboarding/HowToPairModal/HowToPairModal';
import ProgressBar from '@/components/PairRoomOnboarding/ProgressBar/ProgressBar';
import RoleSettingSection from '@/components/PairRoomOnboarding/RoleSettingSection/RoleSettingSection';
import TimerSettingSection from '@/components/PairRoomOnboarding/TimerSettingSection/TimerSettingSection';

import useModal from '@/hooks/common/useModal';
import usePairRoomInformation from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import useAddPairRoomInformation from '@/queries/PairRoomOnboarding/useAddPairRoomInformation';
import useGetPairRoomInformation from '@/queries/PairRoomOnboarding/useGetPairRoomInformation';

import * as S from './PairRoomOnboarding.styles';
import type { Step } from './PairRoomOnboarding.type';

const PairRoomOnboarding = () => {
  const [step, setStep] = useState<Step>('ROLE');

  const navigate = useNavigate();
  const { accessCode } = useParams();

  const { firstPair, secondPair, isFetching } = useGetPairRoomInformation(accessCode || '');
  const { driver, navigator, timer, handleRoleSelect, handleTimer } = usePairRoomInformation(firstPair, secondPair);
  const { isModalOpen: isHowToPairModalOpen, closeModal: closeHowToPairModal } = useModal(false);

  const handleSuccess = () => {
    navigate(`/room/${accessCode}`, { state: { driver, navigator } });
  };

  const { handleAddTimer, isPending } = useAddPairRoomInformation(handleSuccess);

  const handlePrevStep = () => {
    if (step === 'TIMER') {
      setStep('ROLE');
    }
  };

  const handleNextStep = () => {
    if (step === 'ROLE') {
      setStep('TIMER');
    } else if (step === 'TIMER') {
      handleAddTimer({ timer, accessCode: accessCode || '' });
    }
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
          <RoleSettingSection
            driver={driver}
            navigator={navigator}
            pairNames={[firstPair, secondPair]}
            onRoleSelect={handleRoleSelect}
            onNext={handleNextStep}
          />
        )}
        {step === 'TIMER' && (
          <TimerSettingSection
            timer={timer}
            onTimer={(timer: string) => handleTimer(timer)}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}
      </S.Container>
      <HowToPairModal isOpen={isHowToPairModalOpen} closeModal={closeHowToPairModal} />
    </S.Layout>
  );
};

export default PairRoomOnboarding;

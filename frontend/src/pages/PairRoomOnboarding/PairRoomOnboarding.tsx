import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';
import HowToPairModal from '@/components/PairRoomOnboarding/HowToPairModal/HowToPairModal';
import ProgressBar from '@/components/PairRoomOnboarding/ProgressBar/ProgressBar';
import RoleSettingSection from '@/components/PairRoomOnboarding/RoleSettingSection/RoleSettingSection';
import TimerSettingSection from '@/components/PairRoomOnboarding/TimerSettingSection/TimerSettingSection';

import useModal from '@/hooks/common/useModal';

import useGetPairRoomInformation from '@/queries/PairRoom/useGetPairRoomInformation';

import * as S from './PairRoomOnboarding.styles';
import type { Role, Step } from './PairRoomOnboarding.type';

const PairRoomOnboarding = () => {
  const [step, setStep] = useState<Step>('ROLE');

  const navigate = useNavigate();
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timer, setTimer] = useState('');

  const { pairNames, isFetching, refetch } = useGetPairRoomInformation(accessCode || '');

  const { isModalOpen: isHowToPairModalOpen, closeModal: closeHowToPairModal } = useModal(false);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (pairNames) {
      setDriver(pairNames.firstPair);
      setNavigator(pairNames.secondPair);
    }
  }, [pairNames]);

  const handleSelect = (option: string, role: Role) => {
    if (!pairNames) return;

    const otherPair = pairNames.firstPair === option ? pairNames.secondPair : pairNames.firstPair;

    switch (role) {
      case 'DRIVER':
        setDriver(option);
        setNavigator(otherPair);
        return;
      case 'NAVIGATOR':
        setNavigator(option);
        setDriver(otherPair);
        return;
    }
  };

  return (
    <S.Layout>
      <S.Container>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            <ProgressBar step={step} />
            {/* {step === 'MISSION' && <StartMission handleStartMission={handleStartMission} />} */}
            {step === 'ROLE' && pairNames && (
              <RoleSettingSection
                driver={driver}
                navigator={navigator}
                userOptions={[pairNames.firstPair, pairNames.secondPair]}
                onSelect={handleSelect}
                onNext={() => setStep('TIMER')}
              />
            )}
            {step === 'TIMER' && (
              <TimerSettingSection
                timer={timer}
                onTimer={(timer: string) => setTimer(timer)}
                onPrev={() => setStep('ROLE')}
                onNext={() => navigate(`/room/${accessCode}`, { state: { driver, navigator } })}
              />
            )}
          </>
        )}
      </S.Container>
      <HowToPairModal isOpen={isHowToPairModalOpen} closeModal={closeHowToPairModal} />
    </S.Layout>
  );
};

export default PairRoomOnboarding;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StartMission from '@/components/PairRoom/StartMission/StartMission';
import FooterButtons from '@/components/PairRoomOnboarding/FooterButtons/FooterButtons';
import ProgressBar from '@/components/PairRoomOnboarding/ProgressBar/ProgressBar';
import RoleSettingSection from '@/components/PairRoomOnboarding/RoleSettingSection/RoleSettingSection';

import * as S from './PairRoomOnboarding.styles';
import type { Role, Step } from './PairRoomOnboarding.type';

import useCreateBranch from '@/queries/github/useCreateBranch';
import useGetPairRoomInformation from '@/queries/PairRoom/useGetPairRoomInformation';
const PairRoomOnboarding = () => {
  const [step, setStep] = useState<Step>('MISSION');
  const { handleStartMission } = useCreateBranch(() => setStep('ROLE'));

  const navigate = useNavigate();
  const { accessCode } = useParams();

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const { pairNames } = useGetPairRoomInformation(accessCode || '');

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

  const handleNext = () => {
    switch (step) {
      case 'ROLE':
        navigate(`/room/${accessCode}`, { state: { driver, navigator } });
        return;
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <div>
          <ProgressBar step={step} />
          {step === 'MISSION' && <StartMission handleStartMission={handleStartMission} />}
          {step === 'ROLE' && pairNames && (
            <RoleSettingSection
              driver={driver}
              navigator={navigator}
              userOptions={[pairNames.firstPair, pairNames.secondPair]}
              handleSelect={handleSelect}
            />
          )}
        </div>
        <FooterButtons step={step} isComplete={driver !== '' && navigator !== ''} onNext={handleNext} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

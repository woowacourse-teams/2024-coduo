import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useGetPairRoomInformation from '@/queries/PairRoom/useGetPairRoomInformation';

import FooterButtons from '@/components/PairRoomOnBoarding/FooterButtons/FooterButtons';
import ProgressBar from '@/components/PairRoomOnBoarding/ProgressBar/ProgressBar';
import RoleSettingSection from '@/components/PairRoomOnBoarding/RoleSettingSection/RoleSettingSection';
import TimerSettingSection from '@/components/PairRoomOnBoarding/TimerSettingSection/TimerSettingSection';

import { validateTime } from '@/utils/PairRoomOnboarding/validate';

import * as S from './PairRoomOnboarding.styles';
import type { Role, Step } from './PairRoomOnboarding.type';

const PairRoomOnboarding = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  const [step, setStep] = useState<Step>('ROLE');
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timer, setTimer] = useState('');

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
        setDriver(otherPair || '');
        return;
    }
  };

  const handleTimer = (time: string) => setTimer(time);

  const handleBack = () => {
    switch (step) {
      case 'TIMER':
        setStep('ROLE');
        return;
    }
  };

  const handleNext = () => {
    switch (step) {
      case 'ROLE':
        setStep('TIMER');
        return;
      case 'TIMER':
        navigate(`/room/${accessCode}`, { state: { driver, navigator, timer } });
        return;
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <div>
          <ProgressBar step={step} isRoleSelected={Boolean(driver && navigator)} />
          {step === 'ROLE' && pairNames && (
            <RoleSettingSection
              driver={driver}
              navigator={navigator}
              userOptions={[pairNames.firstPair, pairNames.secondPair]}
              handleSelect={handleSelect}
            />
          )}
          {step === 'TIMER' && <TimerSettingSection timer={timer} onTimer={handleTimer} />}
        </div>
        <FooterButtons step={step} isComplete={validateTime(timer)} onBack={handleBack} onNext={handleNext} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

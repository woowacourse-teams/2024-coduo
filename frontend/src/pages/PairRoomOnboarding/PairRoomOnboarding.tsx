import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import FooterButtons from '@/components/PairRoomOnBoarding/FooterButtons/FooterButtons';
import ProgressBar from '@/components/PairRoomOnBoarding/ProgressBar/ProgressBar';
import RoleSettingSection from '@/components/PairRoomOnBoarding/RoleSettingSection/RoleSettingSection';
import TimerSettingSection from '@/components/PairRoomOnBoarding/TimerSettingSection/TimerSettingSection';

import { getPairNames } from '@/apis/pairName';

import { validateTime } from '@/utils/PairRoomOnboarding/validate';

import * as S from './PairRoomOnboarding.styles';
import type { Role, Step } from './PairRoomOnboarding.type';

const PairRoomOnboarding = () => {
  const navigate = useNavigate();
  const { accessCode } = useParams();

  const [step, setStep] = useState<Step>('role');
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timer, setTimer] = useState('');

  const { data } = useQuery({ queryKey: ['getPairNames'], queryFn: () => getPairNames(accessCode || '') });

  useEffect(() => {
    if (data) {
      setDriver(data.firstPair);
      setNavigator(data.secondPair);
    }
  }, [data]);

  const handleSelect = (option: string, role: Role) => {
    if (!option) return;
    switch (role) {
      case 'driver':
        setDriver(option);
        if (data) setNavigator(option === data.firstPair ? data.secondPair : data.firstPair);
        return;
      case 'navigator':
        setNavigator(option);
        if (data) setDriver(option === data.firstPair ? data.secondPair : data.firstPair);
        return;
    }
  };

  const handleTimer = (time: string) => setTimer(time);

  const handleBack = () => {
    switch (step) {
      case 'timer':
        setStep('role');
        return;
    }
  };

  const handleNext = () => {
    switch (step) {
      case 'role':
        setStep('timer');
        return;
      case 'timer':
        navigate(`/room/${accessCode}`, { state: { driver, navigator, timer } });
        return;
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <div>
          <ProgressBar step={step} isRoleSelected={Boolean(driver && navigator)} />
          {step === 'role' && data && (
            <RoleSettingSection
              driver={driver}
              navigator={navigator}
              userOptions={[data.firstPair, data.secondPair]}
              handleSelect={handleSelect}
            />
          )}
          {step === 'timer' && <TimerSettingSection timer={timer} onTimer={handleTimer} />}
        </div>
        <FooterButtons step={step} isComplete={validateTime(timer)} onBack={handleBack} onNext={handleNext} />
      </S.Container>
    </S.Layout>
  );
};

export default PairRoomOnboarding;

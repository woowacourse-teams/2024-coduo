import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';

import { getPairNames } from '@/apis/pairName';

import FooterButtons from './FooterButtons/FooterButtons';
import * as S from './OnboardingModal.styles';
import type { Role, Step } from './OnboardingModal.type';
import ProgressBar from './ProgressBar/ProgressBar';
import RoleSetting from './Steps/RoleSetting';
import TimerSetting from './Steps/TimerSetting';

interface OnboardingModalProps {
  accessCode: string;
  isOpen: boolean;
}

const OnboardingModal = ({ accessCode, isOpen }: OnboardingModalProps) => {
  const [step, setStep] = useState<Step>('role');

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const [timer, setTimer] = useState('');

  const navigate = useNavigate();

  const { data } = useQuery({ queryKey: ['getPairNames'], queryFn: () => getPairNames(accessCode) });

  useEffect(() => {
    if (data) {
      setDriver(data.firstPair);
      setNavigator(data.secondPair);
    }
  }, [data]);

  const handleTimer = (time: string) => setTimer(time);

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
    <Modal isOpen={isOpen} close={() => {}} position="bottom" height="95vh" backdropType="blur">
      <S.Layout>
        <div>
          <ProgressBar step={step} isRoleSelected={Boolean(driver && navigator)} />
          {step === 'role' && data && (
            <RoleSetting
              driver={driver}
              navigator={navigator}
              userOptions={[data.firstPair, data.secondPair]}
              handleSelect={handleSelect}
            />
          )}
          {step === 'timer' && <TimerSetting timer={timer} onTimer={handleTimer} />}
        </div>
        <FooterButtons
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          isRoleSelected={Boolean(driver && navigator)}
          timer={timer}
        />
      </S.Layout>
    </Modal>
  );
};

export default OnboardingModal;

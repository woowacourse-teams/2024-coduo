import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPairNames } from '@/apis/pairName';

import { Modal } from '@/components/common/Modal';
import {
  DRIVER_NAVIGATOR_TITLE,
  ROLE_SETTING_LABEL,
  TIMER_SETTING_LABEL,
  WHY_SET_TIMER_TITLE,
} from '@/components/PairRoom/OnboardingModal/constants';

import FooterButtons from './FooterButtons/FooterButtons';
import type { Role, Step } from './OnboardingModal.type';
import ProgressBar from './Progress/ProgressBar';
import RoleSetting from './Steps/RoleSetting';
import TimerSetting from './Steps/TimerSetting';

interface OnboardingModalProps {
  accessCode: string;
  isOpen: boolean;
  closeModal: () => void;
}

const OnboardingModal = ({ accessCode, isOpen, closeModal }: OnboardingModalProps) => {
  const [step, setStep] = useState<Step>('role');

  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const [timer, setTimer] = useState('');

  const { data } = useQuery({ queryKey: ['getPairNames'], queryFn: () => getPairNames(accessCode) });

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
        closeModal();
        return;
    }
  };

  return (
    <Modal isOpen={isOpen} close={() => {}} position="bottom" height="95%" backdropType="blur">
      <ProgressBar step={step} isRoleSelected={Boolean(driver && navigator)} />
      <Modal.Body>
        {step === 'role' ? (
          <>
            <Modal.Header title={ROLE_SETTING_LABEL} subTitle={DRIVER_NAVIGATOR_TITLE} />
            {data && (
              <RoleSetting
                driver={driver}
                navigator={navigator}
                userOptions={[data.firstPair, data.secondPair]}
                handleSelect={handleSelect}
              />
            )}
          </>
        ) : (
          <>
            <Modal.Header title={TIMER_SETTING_LABEL} subTitle={WHY_SET_TIMER_TITLE} />
            <TimerSetting timer={timer} setTimer={setTimer} />
          </>
        )}
      </Modal.Body>
      <Modal.Footer position="center">
        <FooterButtons
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          isRoleSelected={Boolean(driver && navigator)}
          timer={timer}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default OnboardingModal;

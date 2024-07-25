import { useState } from 'react';

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

const USER_OPTIONS = ['user1', 'user2']; // 임시 데이터

interface OnboardingModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const OnboardingModal = ({ isOpen, closeModal }: OnboardingModalProps) => {
  const [step, setStep] = useState<Step>('role');
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');
  const [timer, setTimer] = useState('');

  const isRoleSelected = Boolean(driver && navigator);

  const handleSelect = (role: Role, option: string) => {
    // TODO: api 호출 후 로직 수정 필요
    if (!option || !USER_OPTIONS) return;

    switch (role) {
      case 'driver':
        setDriver(option);
        setNavigator(option === USER_OPTIONS[0] ? USER_OPTIONS[1] : USER_OPTIONS[0]);
        return;
      case 'navigator':
        setNavigator(option);
        setDriver(option === USER_OPTIONS[0] ? USER_OPTIONS[1] : USER_OPTIONS[0]);
        return;
    }
  };

  const handleNext = () => {
    switch (step) {
      case 'role':
        setStep('timer');
        break;
      case 'timer':
        closeModal(); // TODO: 페이지로 정보 전달 로직 추가 필요
        return;
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'timer':
        setStep('role');
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} close={() => {}} position="bottom" height="95%" backdropType="blur">
      <ProgressBar step={step} isRoleSelected={isRoleSelected} />
      <Modal.Body>
        {step === 'role' ? (
          <>
            <Modal.Header title={ROLE_SETTING_LABEL} subTitle={DRIVER_NAVIGATOR_TITLE} />
            <RoleSetting driver={driver} navigator={navigator} userOptions={USER_OPTIONS} handleSelect={handleSelect} />
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
          isRoleSelected={isRoleSelected}
          timer={timer}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default OnboardingModal;

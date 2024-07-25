import { useState } from 'react';

import { Modal } from '@/components/common/Modal';
import FooterButtons from '@/components/PairRoom/PairRoomOnboardingModal/FooterButtons/FooterButtons';
import Progress from '@/components/PairRoom/PairRoomOnboardingModal/Progress/Progress';
import RoleSetting from '@/components/PairRoom/PairRoomOnboardingModal/Steps/RoleSetting';
import TimerSetting from '@/components/PairRoom/PairRoomOnboardingModal/Steps/TimerSetting';

import type { Role, Step } from './PairRoomOnboardingModal.type';

const USER_OPTIONS = ['user1', 'user2']; // 임시 데이터

const PairRoomOnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(true);
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
        break;
      case 'navigator':
        setNavigator(option);
        setDriver(option === USER_OPTIONS[0] ? USER_OPTIONS[1] : USER_OPTIONS[0]);
        break;
    }
  };

  const handleNext = () => {
    switch (step) {
      case 'role':
        setStep('timer');
        break;
      case 'timer':
        setIsOpen(false); // TODO: 페이지로 정보 전달 로직 추가 필요
        break;
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
    <Modal isOpen={isOpen} close={() => {}} position="bottom" height="95%">
      <Progress step={step} isRoleSelected={isRoleSelected} />
      <Modal.Body>
        {step === 'role' ? (
          <>
            <Modal.Header title="역할 설정" subTitle="드라이버 / 내비게이터를 설정해 주세요." />
            <RoleSetting driver={driver} navigator={navigator} userOptions={USER_OPTIONS} handleSelect={handleSelect} />
          </>
        ) : (
          <>
            <Modal.Header title="타이머 설정" subTitle="타이머를 설정해 주세요." />
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

export default PairRoomOnboardingModal;

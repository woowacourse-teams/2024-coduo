import React from 'react';

import Button from '@/components/common/Button/Button';
import { Step } from '@/components/PairRoom/PairRoomOnboardingModal/PairRoomOnboardingModal.type';

interface FooterButtonsProps {
  step: Step;
  handleBack: () => void;
  handleNext: () => void;
  isRoleSelected: boolean;
  timer?: string;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ step, handleBack, handleNext, isRoleSelected, timer }) => {
  if (step === 'timerSetting') {
    return (
      <Button onClick={handleNext} disabled={!timer}>
        완료
      </Button>
    );
  }

  return (
    <>
      {step !== 'roleSetting' && <Button onClick={handleBack}>이전</Button>}
      <Button onClick={handleNext} disabled={!isRoleSelected}>
        다음
      </Button>
    </>
  );
};

export default FooterButtons;

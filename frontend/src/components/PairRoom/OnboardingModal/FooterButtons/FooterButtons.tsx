import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';
import { Step } from '@/components/PairRoom/OnboardingModal/OnboardingModal.type';

import { validateTime } from '@/utils/validate';

interface FooterButtonsProps {
  step: Step;
  handleBack: () => void;
  handleNext: () => void;
  isRoleSelected: boolean;
  timer?: string;
}

const FooterButtons = ({ step, handleBack, handleNext, isRoleSelected, timer }: FooterButtonsProps) => {
  return (
    <Modal.Footer position="center">
      {step === 'role' && (
        <Button onClick={handleNext} disabled={!isRoleSelected}>
          다음
        </Button>
      )}
      {step === 'timer' && (
        <>
          <Button onClick={handleBack}>이전</Button>
          <Button onClick={handleNext} disabled={!validateTime(Number(timer))}>
            완료
          </Button>
        </>
      )}
    </Modal.Footer>
  );
};

export default FooterButtons;

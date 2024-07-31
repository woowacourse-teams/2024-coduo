import { Step } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

interface FooterButtonsProps {
  step: Step;
  isComplete: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FooterButtons = ({ step, isComplete, onBack, onNext }: FooterButtonsProps) => {
  return (
    <Modal.Footer position="CENTER">
      {step === 'ROLE' && <Button onClick={onNext}>다음</Button>}
      {step === 'TIMER' && (
        <>
          <Button onClick={onBack}>이전</Button>
          <Button onClick={onNext} disabled={!isComplete}>
            완료
          </Button>
        </>
      )}
    </Modal.Footer>
  );
};

export default FooterButtons;

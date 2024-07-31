import { Step } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import { BUTTON_TEXT } from '@/constants/button';

interface FooterButtonsProps {
  step: Step;
  isComplete: boolean;
  onBack: () => void;
  onNext: () => void;
}

const FooterButtons = ({ step, isComplete, onBack, onNext }: FooterButtonsProps) => {
  return (
    <Modal.Footer position="center">
      {step === 'role' && <Button onClick={onNext}>{BUTTON_TEXT.NEXT}</Button>}
      {step === 'timer' && (
        <>
          <Button onClick={onBack}>{BUTTON_TEXT.BACK}</Button>
          <Button onClick={onNext} disabled={!isComplete}>
            {BUTTON_TEXT.COMPLETE}
          </Button>
        </>
      )}
    </Modal.Footer>
  );
};

export default FooterButtons;

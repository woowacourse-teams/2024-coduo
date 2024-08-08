import type { Step } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import { BUTTON_TEXT } from '@/constants/button';

interface FooterButtonsProps {
  step: Step;
  isComplete: boolean;
  onNext: () => void;
}

const FooterButtons = ({ step, isComplete, onNext }: FooterButtonsProps) => {
  return (
    <Modal.Footer position="CENTER">
      {step === 'ROLE' && (
        <Button onClick={onNext} disabled={!isComplete}>
          {BUTTON_TEXT.COMPLETE}
        </Button>
      )}
    </Modal.Footer>
  );
};

export default FooterButtons;

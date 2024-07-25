import Button from '@/components/common/Button/Button';
import { COMPLETE_BUTTON_LABEL, NEXT_BUTTON_LABEL } from '@/components/PairRoom/OnboardingModal/constants';
import { Step } from '@/components/PairRoom/OnboardingModal/OnboardingModal.type';

interface FooterButtonsProps {
  step: Step;
  handleBack: () => void;
  handleNext: () => void;
  isRoleSelected: boolean;
  timer?: string;
}

const FooterButtons = ({ step, handleBack, handleNext, isRoleSelected, timer }: FooterButtonsProps) => {
  switch (step) {
    case 'role':
      return (
        <Button onClick={handleNext} disabled={!isRoleSelected}>
          {NEXT_BUTTON_LABEL}
        </Button>
      );
    case 'timer':
      return (
        <>
          <Button onClick={handleBack}>이전</Button>
          <Button onClick={handleNext} disabled={!timer}>
            {COMPLETE_BUTTON_LABEL}
          </Button>
        </>
      );

    default:
      return;
  }
};

export default FooterButtons;

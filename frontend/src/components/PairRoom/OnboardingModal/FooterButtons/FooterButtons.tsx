import Button from '@/components/common/Button/Button';
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
          다음
        </Button>
      );
    case 'timer':
      return (
        <>
          <Button onClick={handleBack}>이전</Button>
          <Button onClick={handleNext} disabled={!timer}>
            완료
          </Button>
        </>
      );

    default:
      return;
  }
};

export default FooterButtons;

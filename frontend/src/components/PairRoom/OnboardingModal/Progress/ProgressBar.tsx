import Button from '@/components/common/Button/Button';
import { ROLE_SETTING_LABEL, TIMER_SETTING_LABEL } from '@/components/PairRoom/OnboardingModal/constants';
import { Step } from '@/components/PairRoom/OnboardingModal/OnboardingModal.type';

import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  step: Step;
  isRoleSelected: boolean;
}

const ProgressBar = ({ step, isRoleSelected }: ProgressBarProps) => (
  <S.Layout>
    <S.ButtonWrapper>
      <Button rounded={true} size="lg" filled={true} animation={false}>
        1
      </Button>
      <S.ButtonLabel>{ROLE_SETTING_LABEL}</S.ButtonLabel>
    </S.ButtonWrapper>
    <S.ProgressLine $isRoleSelected={isRoleSelected} />
    <S.ButtonWrapper>
      <Button rounded={true} size="lg" filled={step === 'timer'} disabled={!isRoleSelected} animation={false}>
        2
      </Button>
      <S.ButtonLabel>{TIMER_SETTING_LABEL}</S.ButtonLabel>
    </S.ButtonWrapper>
  </S.Layout>
);

export default ProgressBar;

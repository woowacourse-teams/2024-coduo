import Button from '@/components/common/Button/Button';
import { Step } from '@/components/PairRoom/PairRoomOnboardingModal/PairRoomOnboardingModal.type';

import * as S from './Progress.styles';

interface ProgressProps {
  step: Step;
  isRoleSelected: boolean;
}

const Progress = ({ step, isRoleSelected }: ProgressProps) => (
  <S.Layout>
    <S.ButtonWrapper>
      <Button rounded={true} size="lg" filled={true} animation={false}>
        1
      </Button>
      <S.ButtonLabel>역할 설정</S.ButtonLabel>
    </S.ButtonWrapper>
    <S.ProgressLine $isRoleSelected={isRoleSelected} />
    <S.ButtonWrapper>
      <Button rounded={true} size="lg" filled={step === 'timer'} disabled={!isRoleSelected} animation={false}>
        2
      </Button>
      <S.ButtonLabel>타이머 설정</S.ButtonLabel>
    </S.ButtonWrapper>
  </S.Layout>
);

export default Progress;

import Button from '@/components/common/Button/Button';

import { OPTIONS } from '@/constants/PairRoomOnboarding/step';

import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  step: string;
}

const ProgressBar = ({ step }: ProgressBarProps) => (
  <S.Layout>
    {OPTIONS.map((option, idx) => (
      <S.ButtonContainer key={option.id}>
        <S.ButtonWrapper>
          <Button rounded={true} size="lg" filled={step === option.id} animation={false}>
            {idx + 1}
          </Button>
          <S.ButtonLabel>{option.label}</S.ButtonLabel>
        </S.ButtonWrapper>
        {idx === 0 && <S.ProgressLine />}
      </S.ButtonContainer>
    ))}
  </S.Layout>
);

export default ProgressBar;

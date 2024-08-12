import { SpinnerColor, SpinnerSize } from '@/components/common/Spinner/Spinner.type';

import * as S from './Spinner.styles';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const Spinner = ({ size = 'md', color = 'primary' }: SpinnerProps) => {
  return (
    <S.Spinner $size={size}>
      <S.DoubleBounce1 $size={size} $color={color} />
      <S.DoubleBounce2 $size={size} $color={color} />
    </S.Spinner>
  );
};

export default Spinner;

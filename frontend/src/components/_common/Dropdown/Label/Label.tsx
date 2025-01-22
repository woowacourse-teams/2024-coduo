import { theme } from '@/styles/theme';

import * as S from './Label.styles';

interface LabelProps {
  message: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
}

const Label = ({
  message,
  color = theme.color.primary[800],
  fontSize = theme.fontSize.base,
  fontWeight = theme.fontWeight.medium,
}: LabelProps) => {
  return (
    <S.Layout $color={color} $fontSize={fontSize} $fontWeight={fontWeight}>
      {message}
    </S.Layout>
  );
};

export default Label;

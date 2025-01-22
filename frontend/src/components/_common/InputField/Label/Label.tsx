import { LabelHTMLAttributes } from 'react';

import { theme } from '@/styles/theme';

import * as S from './Label.styles';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  color?: string;
  fontSize?: string;
}

const Label = ({
  color = theme.color.primary[800],
  fontSize = theme.fontSize.base,
  children,
  ...props
}: React.PropsWithChildren<LabelProps>) => {
  return (
    <S.Layout>
      <S.Label $color={color} $fontSize={fontSize} {...props}>
        {children}
      </S.Label>
    </S.Layout>
  );
};

export default Label;

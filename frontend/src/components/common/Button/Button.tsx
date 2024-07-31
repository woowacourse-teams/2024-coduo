import { ButtonHTMLAttributes } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/common/Button/Button.styles';
import { ButtonColor, ButtonSize } from '@/components/common/Button/Button.type';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fontSize?: string;

  color?: ButtonColor;
  filled?: boolean;
  rounded?: boolean;
  animation?: boolean;

  css?: ReturnType<typeof css>;
}

const Button = ({
  size = 'LG',
  filled = true,
  rounded = false,
  animation = true,
  color = 'PRIMARY',
  children,
  css,
  disabled = false,
  ...props
}: React.PropsWithChildren<ButtonProp>) => {
  return (
    <S.Button
      $size={size}
      $filled={filled}
      $rounded={rounded}
      $animation={animation}
      $color={color}
      $css={css}
      disabled={disabled}
      {...props}
    >
      {children}
    </S.Button>
  );
};

export default Button;

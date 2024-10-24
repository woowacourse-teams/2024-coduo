import { ButtonHTMLAttributes } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/common/Button/Button.styles';
import type { ButtonColor, ButtonSize } from '@/components/common/Button/Button.type';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  $css?: ReturnType<typeof css>;
  size?: ButtonSize;
  fontSize?: string;
  color?: ButtonColor;
  filled?: boolean;
  rounded?: boolean;
  animation?: boolean;
}

const Button = ({
  $css,
  size = 'lg',
  filled = true,
  rounded = false,
  animation = true,
  color = 'primary',
  children,
  disabled = false,
  ...props
}: React.PropsWithChildren<ButtonProp>) => {
  return (
    <S.Button
      type="button"
      $size={size}
      $filled={filled}
      $rounded={rounded}
      $animation={animation}
      $color={color}
      $css={$css}
      disabled={disabled}
      {...props}
    >
      {children}
    </S.Button>
  );
};

export default Button;

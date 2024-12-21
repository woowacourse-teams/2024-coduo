import { ButtonHTMLAttributes, forwardRef } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/_common/Button/Button.styles';
import type { ButtonColor, ButtonSize } from '@/components/_common/Button/Button.type';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  $css?: ReturnType<typeof css>;
  size?: ButtonSize;
  width?: string;
  height?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  color?: ButtonColor | string;
  filled?: boolean;
  rounded?: boolean;
  animation?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProp>(
  (
    {
      $css,
      size = 'md',
      width,
      height,
      borderRadius,
      fontSize,
      fontWeight,
      textAlign,
      filled = true,
      rounded = false,
      animation = false,
      color = 'primary',
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <S.Button
        ref={ref}
        type="button"
        $size={size}
        $width={width}
        $height={height}
        $borderRadius={borderRadius}
        $fontSize={fontSize}
        $fontWeight={fontWeight}
        $textAlign={textAlign}
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
  },
);

Button.displayName = 'Button';

export default Button;

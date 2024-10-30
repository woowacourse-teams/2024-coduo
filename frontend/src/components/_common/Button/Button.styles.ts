import styled, { css } from 'styled-components';

import type { ButtonColor, ButtonSize } from '@/components/_common/Button/Button.type';

import { calculateButtonColor } from '@/utils/calculateButtonColor';

interface ButtonStyleProp {
  $css?: ReturnType<typeof css>;
  $size: ButtonSize;
  $width?: string;
  $height?: string;
  $borderRadius?: string;
  $fontSize?: string;
  $color: ButtonColor | string;
  $filled: boolean;
  $rounded: boolean;
  $animation: boolean;
  disabled: boolean;
}

interface ButtonShapesProp {
  size?: ButtonSize;
  width?: string;
  height?: string;
  fontSize?: string;
}

const buttonSize = ({ size, width, height, fontSize }: ButtonShapesProp) => {
  const defaultSizes = {
    sm: { width: '6rem', height: '3rem', fontSize: 'sm' },
    md: { width: '10rem', height: '4rem', fontSize: 'md' },
    lg: { width: '15rem', height: '4rem', fontSize: 'base' },
    xl: { width: '24.5rem', height: '6.5rem', fontSize: 'h5' },
  };

  const { width: defaultWidth, height: defaultHeight, fontSize: defaultFontSize } = defaultSizes[size || 'md'];

  return css`
    width: ${width || defaultWidth};
    height: ${height || defaultHeight};

    font-size: ${fontSize || (({ theme }) => theme.fontSize[defaultFontSize as keyof typeof theme.fontSize])};
  `;
};

interface ButtonColorProp {
  color: ButtonColor | string;
  filled: boolean;
}

const buttonColor = ({ color, filled }: ButtonColorProp) => {
  const { base, hover, active, disabled } = calculateButtonColor(color, filled);

  return css`
    ${base}
    &:hover {
      ${hover}
    }

    &:active {
      ${active}
    }

    &:disabled {
      ${disabled}
    }
  `;
};

interface ButtonAnimationProp {
  animation: boolean;
}

const buttonAnimation = ({ animation }: ButtonAnimationProp) => css`
  &:hover {
    transform: ${animation ? 'scale(1.01)' : 'none'};
  }

  &:active {
    transform: ${animation ? 'scale(1.02)' : 'none'};
  }
`;

export const Button = styled.button<ButtonStyleProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-radius: ${({ $rounded, $borderRadius }) => $borderRadius || ($rounded ? '50rem' : '0.5rem')};

  transition: all 0.2s;

  ${({ $size, $width, $height, $fontSize }) =>
    buttonSize({ size: $size, width: $width, height: $height, fontSize: $fontSize })}

  ${({ $color, $filled }) => buttonColor({ color: $color, filled: $filled })}

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ $animation }) => $animation && buttonAnimation({ animation: $animation })}

  ${(props) => props.$css}
`;

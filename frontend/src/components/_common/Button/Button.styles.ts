import styled, { css } from 'styled-components';

import type { ButtonColor, ButtonSize } from '@/components/_common/Button/Button.type';

import { theme } from '@/styles/theme';

interface ButtonStyleProp {
  $css?: ReturnType<typeof css>;
  $size: ButtonSize;
  $width?: string;
  $height?: string;
  $borderRadius?: string;
  $fontSize?: string;
  $color: ButtonColor;
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

const buttonShapes = ({ size, width, height, fontSize }: ButtonShapesProp) => {
  switch (size) {
    case 'sm':
      return css`
        width: ${width || '6rem'};
        height: ${height || '3rem'};

        font-size: ${fontSize || (({ theme }) => theme.fontSize.sm)};
      `;
    case 'md':
      return css`
        width: ${width || '10rem'};
        height: ${height || '4rem'};

        font-size: ${fontSize || (({ theme }) => theme.fontSize.md)};
      `;
    case 'lg':
      return css`
        width: ${width || '15rem'};
        height: ${height || '4rem'};

        font-size: ${fontSize || (({ theme }) => theme.fontSize.base)};
      `;
    case 'xl':
      return css`
        width: ${width || '24.5rem'};
        height: ${height || '6.5rem'};

        font-size: ${fontSize || (({ theme }) => theme.fontSize.h5)};
      `;
  }
};

interface ButtonColorProp {
  color: ButtonColor;
  filled: boolean;
  animation: boolean;
}

const buttonVisual = ({ color, filled, animation }: ButtonColorProp) => {
  if (color in theme.color) {
    const colorKey = color as keyof typeof theme.color;
    return css`
      border: 1px solid ${theme.color[colorKey][colorKey === 'primary' ? 600 : 400]};

      background-color: ${filled ? theme.color[colorKey][colorKey === 'primary' ? 600 : 400] : theme.color.black[100]};
      color: ${filled ? theme.color.black[100] : theme.color[colorKey][colorKey === 'primary' ? 600 : 400]};

      &:hover {
        border: 1px solid ${theme.color[colorKey][colorKey === 'primary' ? 700 : 500]};

        background-color: ${filled
          ? theme.color[colorKey][colorKey === 'primary' ? 700 : 500]
          : theme.color.black[200]};

        transform: ${animation && 'scale(1.01)'};
      }

      &:active {
        border: 1px solid ${theme.color[colorKey][colorKey === 'primary' ? 800 : 600]};

        background-color: ${filled
          ? theme.color[colorKey][colorKey === 'primary' ? 800 : 600]
          : theme.color.black[300]};

        transform: ${animation && 'scale(1.02)'};
      }

      &:disabled {
        border: 1px solid ${theme.color.black[300]};

        background-color: ${theme.color.black[300]};
        color: ${theme.color.black[100]};
      }
    `;
  }
  throw new Error('버튼 색상이 올바르지 않습니다.');
};

export const Button = styled.button<ButtonStyleProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${({ $rounded, $borderRadius }) => ($borderRadius ? $borderRadius : $rounded ? '50rem' : '0.5rem')};

  transition: all 0.2s;

  ${({ $size, $width, $height, $fontSize }) =>
    buttonShapes({ size: $size, width: $width, height: $height, fontSize: $fontSize })}

  ${({ $color, $filled, $animation }) => buttonVisual({ color: $color, filled: $filled, animation: $animation })}

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${(props) => props.$css}
`;

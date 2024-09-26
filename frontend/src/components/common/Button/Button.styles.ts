import styled, { css } from 'styled-components';

import type { ButtonColor, ButtonSize } from '@/components/common/Button/Button.type';

interface ButtonStyleProp {
  $color: ButtonColor;
  $animation: boolean;
  $size: ButtonSize;
  $filled: boolean;
  $rounded: boolean;
  disabled: boolean;
  $css?: ReturnType<typeof css>;
}
const buttonShapes = {
  sm: css`
    width: 6rem;
    height: 3rem;

    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    width: 10rem;
    height: 4rem;

    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  lg: css`
    width: 15rem;
    height: 4rem;

    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  xl: css`
    width: 24.5rem;
    height: 6.5rem;

    font-size: ${({ theme }) => theme.fontSize.h5};
  `,
};

export const Button = styled.button<ButtonStyleProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme, $color }) => theme.color[$color][500]};
  border-radius: ${({ $rounded }) => ($rounded ? '50rem' : '1rem')};

  background-color: ${({ $filled, theme, $color }) => ($filled ? theme.color[$color][500] : theme.color.black[10])};
  color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[$color][500])};

  transition: all 0.2s;

  ${({ $size }) => buttonShapes[$size]}

  &:hover {
    border: 1px solid ${({ theme, $color }) => theme.color[$color][600]};

    background-color: ${({ $filled, theme, $color }) => ($filled ? theme.color[$color][600] : theme.color.black[10])};
    color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[$color][600])};

    transform: ${({ $animation }) => $animation && 'scale(1.01)'};
  }

  &:active {
    border: 1px solid ${({ theme, $color }) => theme.color[$color][700]};

    background-color: ${({ $filled, theme, $color }) => ($filled ? theme.color[$color][700] : theme.color.black[10])};
    color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[$color][700])};

    transform: ${($animation) => $animation && 'scale(1.02)'};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[50]};

    background-color: ${({ $filled, theme }) => ($filled ? theme.color.black[50] : theme.color.black[10])};
    color: ${({ $filled, theme }) => ($filled ? 'white' : theme.color.black[50])};
  }

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  ${(props) => props.$css}
`;

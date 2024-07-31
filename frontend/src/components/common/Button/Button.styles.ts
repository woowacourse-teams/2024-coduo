import styled, { css } from 'styled-components';

import { ButtonColor, ButtonSize } from '@/components/common/Button/Button.type';

interface ButtonStyleProp {
  $color: ButtonColor;
  $animation: boolean;
  $size: ButtonSize;
  $filled: boolean;
  $rounded: boolean;
  disabled: boolean;
  $css?: ReturnType<typeof css>;
}
const getColor = ($color: ButtonColor) => ($color === 'PRIMARY' ? 'primary' : 'secondary');
const buttonShapes = {
  SM: css`
    width: 6rem;
    height: 3rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  MD: css`
    width: 10rem;
    height: 4rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  LG: css`
    width: 15rem;
    height: 4rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  XL: css`
    width: 24.5rem;
    height: 6.5rem;
    font-size: ${({ theme }) => theme.fontSize.h5};
  `,
};

export const Button = styled.button<ButtonStyleProp>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[getColor($color)][500])};

  background-color: ${({ $filled, theme, $color }) =>
    $filled ? theme.color[getColor($color)][500] : theme.color.black[10]};
  border: 1px solid ${({ theme, $color }) => theme.color[getColor($color)][500]};
  border-radius: ${({ $rounded }) => ($rounded ? '50rem' : '1rem')};

  transition: all 0.2s;

  ${({ $size }) => buttonShapes[$size]}

  &:hover {
    transform: ${({ $animation }) => $animation && 'scale(1.01)'};
    color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[getColor($color)][600])};
    background-color: ${({ $filled, theme, $color }) =>
      $filled ? theme.color[getColor($color)][600] : theme.color.black[10]};
    border: 1px solid ${({ theme, $color }) => theme.color[getColor($color)][600]};
  }

  &:active {
    transform: ${($animation) => $animation && 'scale(1.02)'};
    color: ${({ $filled, theme, $color }) => ($filled ? theme.color.black[10] : theme.color[getColor($color)][700])};
    background-color: ${({ $filled, theme, $color }) =>
      $filled ? theme.color[getColor($color)][700] : theme.color.black[10]};
    border: 1px solid ${({ theme, $color }) => theme.color[getColor($color)][700]};
  }

  &:disabled {
    color: ${({ $filled, theme }) => ($filled ? 'white' : theme.color.black[50])};
    background-color: ${({ $filled, theme }) => ($filled ? theme.color.black[50] : theme.color.black[10])};
    border: 1px solid ${({ theme }) => theme.color.black[50]};
  }

  ${(props) => props.$css}
`;

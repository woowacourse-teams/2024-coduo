import styled, { css } from 'styled-components';

import { ButtonColor, ButtonSize } from '@/components/common/Button/Button.type';

interface ButtonStyleProp {
  $color: ButtonColor;
  $animation: boolean;
  $size: ButtonSize;
  $filled: boolean;
  $rounded: boolean;
  $disabled: boolean;
  $css?: ReturnType<typeof css>;
}

const buttonShapes = {
  sm: css`
    width: 9.6rem;
    height: 4.8rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    width: 16rem;
    height: 6.4rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  lg: css`
    width: 24rem;
    height: 6.4rem;
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  xl: css`
    width: 40rem;
    height: 10.4rem;
    font-size: ${({ theme }) => theme.fontSize.h5};
  `,
};

export const Button = styled.button<ButtonStyleProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: all 0.2s;

  ${({ $size }) => buttonShapes[$size]}

  background-color: ${(props) => (props.$filled ? props.theme.color[props.$color][500] : 'white')};
  color: ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][500])};

  border: 1px solid ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][500])};
  border-radius: ${(props) => (props.$rounded ? '50rem' : '1rem')};

  &:hover {
    transform: ${(props) => props.$animation && 'scale(1.01)'};

    background-color: ${(props) => (props.$filled ? props.theme.color[props.$color][600] : 'white')};
    color: ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][600])};

    border: 1px solid ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][600])};
  }

  &:active {
    transform: ${(props) => props.$animation && 'scale(1.02)'};

    background-color: ${(props) => (props.$filled ? props.theme.color[props.$color][700] : 'white')};
    color: ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][700])};

    border: 1px solid ${(props) => (props.$filled ? 'white' : props.theme.color[props.$color][700])};
  }

  &:disabled {
    background-color: ${(props) => (props.$filled ? props.theme.color.black[50] : 'white')};
    color: ${(props) => (props.$filled ? 'white' : props.theme.color.black[50])};

    border: 1px solid ${(props) => (props.$filled ? 'white' : props.theme.color.black[50])};
  }

  ${(props) => props.$css}
`;

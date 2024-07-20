import styled, { css } from 'styled-components';

import { ButtonColor } from './Button';

interface BasicButtonProp {
  width: string;
  height: string;
  fontSize: string;
  filled: boolean;
  rounded: boolean;
  css?: ReturnType<typeof css>;
}

interface ButtonStyleProp extends BasicButtonProp {
  color: ButtonColor;
  animation?: boolean;
}

export const BasicButton = styled.button<BasicButtonProp>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.css}
`;

export const DisabledButton = styled(BasicButton)`
  background-color: ${(props) => (props.filled ? props.theme.color.black[50] : 'white')};
  color: ${(props) => (props.filled ? 'white' : props.theme.color.black[50])};

  border: 1px solid ${(props) => (props.filled ? 'white' : props.theme.color.black[50])};
  border-radius: ${(props) => (props.rounded ? '50rem' : '1rem')};
`;

export const Button = styled(BasicButton)<ButtonStyleProp>`
  background-color: ${(props) => (props.filled ? props.theme.color[props.color][500] : 'white')};
  color: ${(props) => (props.filled ? 'white' : props.theme.color[props.color][500])};

  border: 1px solid ${(props) => (props.filled ? 'white' : props.theme.color[props.color][500])};
  border-radius: ${(props) => (props.rounded ? '50rem' : '1rem')};

  transition: all 0.2s;

  &:hover {
    transform: ${(props) => props.animation && 'scale(1.01)'};

    background-color: ${(props) => (props.filled ? props.theme.color[props.color][600] : 'white')};
    color: ${(props) => (props.filled ? 'white' : props.theme.color[props.color][600])};

    border: 1px solid ${(props) => (props.filled ? 'white' : props.theme.color[props.color][600])};
  }

  &:active {
    transform: ${(props) => props.animation && 'scale(1.02)'};

    background-color: ${(props) => (props.filled ? props.theme.color[props.color][700] : 'white')};
    color: ${(props) => (props.filled ? 'white' : props.theme.color[props.color][700])};

    border: 1px solid ${(props) => (props.filled ? 'white' : props.theme.color[props.color][700])};
  }
`;

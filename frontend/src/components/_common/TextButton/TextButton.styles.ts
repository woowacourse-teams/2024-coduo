import styled, { css } from 'styled-components';

import { StyleTextButtonProps } from '@/components/_common/TextButton/TextButton.type';

import { theme } from '@/styles/theme';

const fontSize = ({ $size }: { $size: string }) => {
  return css`
    ${(() => {
      switch ($size) {
        case 'base':
          return css`
            font-size: ${theme.fontSize.base};
          `;
        case 'sm':
          return css`
            font-size: ${theme.fontSize.sm};
          `;
        case 'md':
          return css`
            font-size: ${theme.fontSize.md};
          `;
        case 'lg':
          return css`
            font-size: ${theme.fontSize.lg};
          `;
        case 'xl':
          return css`
            font-size: ${theme.fontSize.h6};
          `;
        default:
          return css`
            font-size: ${$size};
          `;
      }
    })()}
  `;
};

export const Layout = styled.button<StyleTextButtonProps>`
  ${fontSize};
  justify-content: center;
  align-items: center;

  color: ${({ $color }) => $color};
  text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};

  transition: all 0.1s;

  cursor: pointer;

  &:hover {
    opacity: ${({ $opacity }) => ($opacity ? 0.7 : 1)};
    text-decoration: underline;
  }

  &:active {
    opacity: ${({ $opacity }) => ($opacity ? 0.5 : 1)};
    text-decoration: underline;
  }

  &:disabled {
    color: ${theme.color.black[500]};

    cursor: default;

    &:hover {
      opacity: none;
      text-decoration: none;
    }

    &:active {
      opacity: none;
      text-decoration: none;
    }
  }

  ${({ $css }) => $css}
`;

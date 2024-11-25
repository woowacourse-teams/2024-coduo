import styled, { css } from 'styled-components';

import { HoverType, StyleTextButtonProps } from '@/components/_common/TextButton/TextButton.type';

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

const hoverType = ({ $hoverType }: { $hoverType: HoverType }) => {
  return css`
    ${(() => {
      switch ($hoverType) {
        case 'DARK':
          return css`
            &:hover {
              filter: brightness(0.8);

              text-decoration: underline;
            }

            &:active {
              filter: brightness(0.6);

              text-decoration: underline;
            }
          `;
        case 'LIGHT':
          return css`
            &:hover {
              opacity: 0.7;
              text-decoration: underline;
            }

            &:active {
              opacity: 0.5;
              text-decoration: underline;
            }
          `;
      }
    })()}
  `;
};

export const Layout = styled.button<StyleTextButtonProps>`
  ${fontSize};
  ${hoverType}
  justify-content: center;
  align-items: center;

  color: ${({ $color }) => $color};
  text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};

  transition: 0.2s;

  cursor: pointer;

  &:disabled {
    color: ${theme.color.black[500]};

    cursor: default;

    &:hover {
      opacity: none;
      text-decoration: none;
      filter: none;
    }

    &:active {
      opacity: none;
      text-decoration: none;
      filter: none;
    }
  }

  ${({ $css }) => $css}
`;

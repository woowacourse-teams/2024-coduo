import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';

const buttonSize = ({ $size }: { $size: string }) => {
  return css`
    ${(() => {
      switch ($size) {
        case 'sm':
          return css`
            width: ${theme.iconButtonSize.sm};
            min-width: ${theme.iconButtonSize.sm};
          `;
        case 'md':
          return css`
            width: ${theme.iconButtonSize.md};
            min-width: ${theme.iconButtonSize.md};
          `;
        case 'lg':
          return css`
            width: ${theme.iconButtonSize.lg};
            min-width: ${theme.iconButtonSize.lg};
          `;
        case 'xl':
          return css`
            width: ${theme.iconButtonSize.xl};
            min-width: ${theme.iconButtonSize.xl};
          `;
        default:
          return css`
            width: calc(${$size} + 1rem);
            min-width: calc(${$size} + 1rem);
          `;
      }
    })()}
  `;
};

const iconSize = ({ $size }: { $size: string }) => {
  return css`
    ${(() => {
      switch ($size) {
        case 'sm':
          return css`
            width: ${theme.iconSize.sm};
            height: ${theme.iconSize.sm};
          `;
        case 'md':
          return css`
            width: ${theme.iconSize.md};
            height: ${theme.iconSize.md};
          `;
        case 'lg':
          return css`
            width: ${theme.iconSize.lg};
            height: ${theme.iconSize.lg};
          `;
        case 'xl':
          return css`
            width: ${theme.iconSize.xl};
            height: ${theme.iconSize.xl};
          `;
        default:
          return css`
            width: ${$size};
            height: ${$size};
          `;
      }
    })()}
  `;
};

interface IconButtonProps {
  $css?: ReturnType<typeof css>;
  $size: string;
  $width?: string;
  $isActive?: boolean;
}

export const Layout = styled.button<IconButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;

  border-radius: 0.5rem;

  transition: background-color 0.2s ease-in-out;

  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};

  ${buttonSize}

  ${({ $css }) => $css}
  
  &:hover {
    background-color: ${({ $isActive }) => $isActive && theme.color.black[200]};
  }

  &:active {
    background-color: ${({ $isActive }) => $isActive && theme.color.black[300]};
  }

  svg {
    ${iconSize}
    aspect-ratio: 1;
  }
`;

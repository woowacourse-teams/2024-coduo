import styled, { css } from 'styled-components';

import { ButtonColor } from '@/components/_common/Button/Button.type';

import { calculateButtonColor } from '@/utils/calculateButtonColor';

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

interface BackgroundColorProp {
  $backgroundColor: ButtonColor | string;
}

const backgroundColor = ({ $backgroundColor }: BackgroundColorProp) => {
  const { base, hover, active, disabled } = calculateButtonColor($backgroundColor, true);

  return css`
    &:disabled {
      ${disabled}
    }

    &:not(:disabled) {
      ${base}
      &:hover {
        ${hover}
      }

      &:active {
        ${active}
      }
    }
  `;
};

interface IconButtonProps {
  $css?: ReturnType<typeof css>;
  $size: string;
  $isActive?: boolean;
  $backgroundColor: string;
}

export const Layout = styled.button<IconButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;

  border-radius: 0.5rem;

  transition: background-color 0.2s ease-in-out;

  cursor: ${({ $isActive, disabled }) => ($isActive && !disabled ? 'pointer' : 'default')};

  ${buttonSize}

  ${({ $backgroundColor }) => backgroundColor({ $backgroundColor })}

  ${({ $css }) => $css}

  svg {
    ${iconSize}
    aspect-ratio: 1;
  }
`;

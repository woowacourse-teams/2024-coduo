import styled from 'styled-components';

import { Direction } from '@/components/_common/Dropdown/Dropdown';

import { Z_INDEX } from '@/constants/style';

import { theme } from '@/styles/theme';

export const Layout = styled.div<{ $width: string }>`
  position: relative;

  width: ${({ $width }) => $width};
  height: fit-content;

  background-color: ${theme.color.black[100]};
`;

export const Container = styled.div<{ $direction: Direction; $height: string }>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'LOWER' ? 'column' : 'column-reverse')};

  button {
    width: 100%;
    height: ${({ $height }) => $height};
    padding: 1.5rem;
    border-radius: 1rem;

    color: ${theme.color.black[500]};
    font-size: ${theme.fontSize.md};

    transition: all 0.2s;

    &:hover {
      background-color: ${theme.color.black[200]};
      color: ${theme.color.primary[800]};
    }

    &:active {
      background-color: ${theme.color.black[300]};
      color: ${theme.color.primary[800]};
    }
  }
`;

export const OpenButton = styled.button<{ $isOpen: boolean; $isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ $isOpen, $isSelected }) => ($isSelected || $isOpen) && theme.color.primary[800]};

  color: ${({ $isSelected }) => $isSelected && theme.color.primary[800]};

  svg {
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180' : '0')}deg);
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    border-color: ${theme.color.primary[800]};
  }

  &:active {
    border-color: ${theme.color.primary[800]};
  }
`;

export const ItemList = styled.ul<{ $direction: Direction }>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'LOWER' ? 'column' : 'column-reverse')};
  overflow-y: auto;

  position: absolute;
  top: ${({ $direction }) => $direction === 'LOWER' && '5.4rem'};
  bottom: ${({ $direction }) => $direction === 'UPPER' && '5.4rem'};
  z-index: ${Z_INDEX.DROPDOWN};

  width: 100%;
  max-height: 20rem;
  border-radius: 1rem;

  box-shadow:
    0 0 1px grey,
    1px 1px 2px lightgrey;
`;

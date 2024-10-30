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

export const Container = styled.div<{ $direction: Direction; $height: string; $color: string; $fontSize: string }>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'LOWER' ? 'column' : 'column-reverse')};

  button {
    width: 100%;
    height: ${({ $height }) => $height};
    padding: 1.5rem;
    border-radius: 1rem;

    font-size: ${({ $fontSize }) => $fontSize};

    transition: all 0.2s;

    &:hover {
      background-color: ${theme.color.black[200]};
      color: ${({ $color }) => $color};
    }

    &:active {
      background-color: ${theme.color.black[300]};
      color: ${({ $color }) => $color};
    }
  }
`;

export const OpenButton = styled.button<{ $isOpen: boolean; $isSelected: boolean; $color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ $isOpen, $isSelected, $color }) => ($isSelected || $isOpen) && $color};

  color: ${({ $isSelected, $color }) => ($isSelected ? $color : theme.color.black[500])};

  svg {
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180' : '0')}deg);
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    border-color: ${({ $color }) => $color};
  }

  &:active {
    border-color: ${({ $color }) => $color};
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
  color: ${theme.color.black[500]};
`;

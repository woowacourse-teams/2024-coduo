import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

import Button from '@/components/common/Button/Button';
import { Direction } from '@/components/common/Dropdown/Dropdown/Dropdown';

import { Z_INDEX } from '@/constants/style';

const getDirection = {
  lower: {
    open: 180,
    close: 0,
  },
  upper: {
    open: 0,
    close: 180,
  },
};

export const Layout = styled.div<{ $width: string; $height: string }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;

  width: ${({ $width }) => $width};
  height: fit-content;

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: ${({ $height }) => $height};
    padding: 1rem;
    padding-left: 1.7rem;
    border-radius: 0.8rem;

    font-size: ${({ theme }) => theme.fontSize.md};

    &:hover {
      background-color: ${({ theme }) => theme.color.black[40]};

      transform: none;
    }

    &:active {
      background-color: ${({ theme }) => theme.color.black[60]};

      transform: none;
    }
  }
`;

export const OpenButton = styled(Button)<{ $isSelected: boolean; $isOpen: boolean }>`
  border: 1px solid
    ${({ $isSelected, $isOpen, theme }) => ($isSelected || $isOpen ? theme.color.primary[700] : theme.color.black[50])};

  background-color: white;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.color.primary[700] : theme.color.black[50])};
`;

export const Icon = styled(RiArrowDropDownLine)<{ $isOpen: boolean; $direction: Direction }>`
  transform: rotate(${({ $isOpen, $direction }) => getDirection[$direction][$isOpen ? 'open' : 'close']}deg);
  transition: transform 0.2s ease-in-out;
`;

export const DropdownContainer = styled.div<{ $direction: Direction }>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'lower' ? 'column' : 'column-reverse')};
`;

export const ItemList = styled.ul<{ $height: string; $direction: Direction }>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'lower' ? 'column' : 'column-reverse')};
  overflow-y: auto;

  position: absolute;
  top: ${({ $direction }) => ($direction === 'lower' ? '5rem' : '')};
  bottom: ${({ $direction }) => ($direction === 'lower' ? '' : '5rem')};
  left: 0;
  z-index: ${Z_INDEX.DROPDOWN};

  width: 100%;
  max-height: 20rem;
  border-radius: 0.8rem;

  background-color: white;
  box-shadow:
    0 0 2px grey,
    1px 1px 3px lightgrey;
`;

export const Item = styled(Button)`
  justify-content: flex-start;

  height: 4.8rem;
  border: none;

  color: ${({ theme }) => theme.color.primary[700]};

  &:hover {
    border: none;
  }
`;

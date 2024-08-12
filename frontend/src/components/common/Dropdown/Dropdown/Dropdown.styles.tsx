import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

import Button from '@/components/common/Button/Button';

export const Layout = styled.div<{ $width: string }>`
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
    height: 4.8rem;
    padding: 1rem;
    padding-left: 1.7rem;
    border-radius: 0.8rem;

    font-size: 1.6rem;

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

export const Icon = styled(RiArrowDropDownLine)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
  transition: transform 0.2s ease-in-out;
`;

export const ItemList = styled.ul<{ $width: string }>`
  overflow-y: auto;

  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  z-index: 1000;

  width: ${({ $width }) => $width};
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

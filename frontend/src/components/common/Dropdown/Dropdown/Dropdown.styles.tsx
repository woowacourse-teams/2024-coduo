import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

import Button from '@/components/common/Button/Button';

export const Layout = styled.div<{ $width: string }>`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: ${({ $width }) => $width};
  height: fit-content;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 4.8rem;
    padding: 1rem;
    padding-left: 1.7rem;

    font-size: 1.6rem;

    border-radius: 0.8rem;

    &:hover {
      transform: none;
      background-color: ${({ theme }) => theme.color.black[40]};
    }

    &:active {
      transform: none;
      background-color: ${({ theme }) => theme.color.black[60]};
    }
  }
`;

export const OpenButton = styled(Button)<{ $isSelected: boolean; $isOpen: boolean }>`
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.color.primary[700] : theme.color.black[50])};
  background-color: white;
  border: 1px solid
    ${({ $isSelected, $isOpen, theme }) => ($isSelected || $isOpen ? theme.color.primary[700] : theme.color.black[50])};
`;

export const Icon = styled(RiArrowDropDownLine)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
  transition: transform 0.2s ease-in-out;
`;

export const ItemList = styled.ul<{ $width: string }>`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 1rem);
  left: 0;

  overflow-y: auto;

  width: ${({ $width }) => $width};
  max-height: 20rem;

  background-color: white;
  border-radius: 0.8rem;
  box-shadow:
    0 0 2px grey,
    1px 1px 3px lightgrey;
`;

export const Item = styled(Button)`
  justify-content: flex-start;
  height: 4.8rem;
  color: ${({ theme }) => theme.color.primary[700]};
  border: none;

  &:hover {
    border: none;
  }
`;

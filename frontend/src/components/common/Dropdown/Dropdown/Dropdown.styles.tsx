import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

import Button from '@/components/common/Button/Button';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  gap: 1rem;

  Button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5rem;
    border-radius: 0.8rem;
    padding: 1rem;
    padding-left: 1.7rem;
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

export const DropdownButton = styled(Button)<{ $isSelected: boolean; $isOpen: boolean }>`
  border: 1px solid
    ${({ $isSelected, $isOpen, theme }) => ($isSelected || $isOpen ? theme.color.primary[700] : theme.color.black[50])};
  background-color: white;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.color.primary[700] : theme.color.black[50])};
`;

export const DropdownIcon = styled(RiArrowDropDownLine)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? 180 : 0)}deg);
  transition: transform 0.2s ease-in-out;
`;

export const DropdownMenuItemList = styled.ul`
  max-height: 20rem;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow:
    0px 1px 2px black,
    1px 1px 3px gray;
`;

export const DropdownMenuItem = styled(Button)`
  border: none;
  justify-content: flex-start;
  color: ${({ theme }) => theme.color.primary[700]};

  &:hover {
    border: none;
  }
`;

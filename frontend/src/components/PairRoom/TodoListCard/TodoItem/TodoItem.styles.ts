import { AiFillDelete } from 'react-icons/ai';
import styled from 'styled-components';

export const Layout = styled.div<{ $isChecked: boolean; $isIconHovered: boolean; $isDraggedOver: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({ $isChecked, $isDraggedOver, theme }) =>
    $isChecked
      ? $isDraggedOver
        ? theme.color.black[40]
        : theme.color.black[30]
      : $isDraggedOver
        ? theme.color.secondary[200]
        : theme.color.secondary[100]};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: background 0.2s ease;

  cursor: pointer;

  &:hover {
    background: ${({ $isChecked, $isIconHovered, theme }) =>
      !$isIconHovered && ($isChecked ? theme.color.black[40] : theme.color.secondary[150])};
  }
`;

export const TodoContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    text-decoration: ${({ $isChecked }) => $isChecked && 'line-through'};

    transition: text-decoration 0.2s ease;
  }
`;

export const DeleteIcon = styled(AiFillDelete)<{ $isChecked: boolean }>`
  width: ${({ theme }) => theme.fontSize.lg};
  height: ${({ theme }) => theme.fontSize.lg};

  color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[50] : theme.color.secondary[500])};

  transition: color 0.2s ease;

  &:hover {
    color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[60] : theme.color.secondary[600])};
  }
`;

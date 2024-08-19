import { AiFillDelete } from 'react-icons/ai';
import styled from 'styled-components';

export const Layout = styled.div<{ $isDraggedOver: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({ $isDraggedOver, theme }) =>
    $isDraggedOver ? theme.color.secondary[200] : theme.color.secondary[100]};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: background 0.2s ease;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.secondary[150]};
  }
`;

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const DeleteIcon = styled(AiFillDelete)`
  width: ${({ theme }) => theme.fontSize.lg};
  height: ${({ theme }) => theme.fontSize.lg};

  color: ${({ theme }) => theme.color.secondary[500]};

  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.color.secondary[600]};
  }
`;

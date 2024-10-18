import { AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';

export const Layout = styled.div<{ $isChecked: boolean; $isIconHovered: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[30] : theme.color.secondary[200])};
  font-size: ${({ theme }) => theme.fontSize.md};

  transition: background 0.1s ease;
`;

export const TodoContainer = styled.div<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    text-decoration: ${({ $isChecked }) => $isChecked && 'line-through'};
    word-break: break-all;

    transition: text-decoration 0.1s ease;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const CopyIcon = styled(AiFillCopy)<{ $isChecked: boolean }>`
  width: 1.7rem;
  height: 1.7rem;

  color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[50] : theme.color.secondary[500])};

  transition: color 0.1s ease;

  cursor: pointer;

  &:hover {
    color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.black[60] : theme.color.secondary[600])};
  }
`;

import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  padding: 2rem;
`;

export const TodoListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

export const CountText = styled.p`
  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

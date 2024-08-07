import styled from 'styled-components';

export const TodoListWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;

  padding: 2rem;
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.black[60]};
`;

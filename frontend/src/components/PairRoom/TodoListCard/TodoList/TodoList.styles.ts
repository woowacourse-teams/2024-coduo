import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;

  padding: 2rem;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.color.black[60]};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

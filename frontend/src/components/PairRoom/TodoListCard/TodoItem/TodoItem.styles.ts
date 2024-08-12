import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({ theme }) => theme.color.secondary[100]};
  font-size: ${({ theme }) => theme.fontSize.md};

  cursor: pointer;
`;

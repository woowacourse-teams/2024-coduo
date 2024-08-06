import styled from 'styled-components';

export const Layout = styled.div`
  cursor: pointer;

  display: flex;
  gap: 1.2rem;
  align-items: center;

  padding: 1.6rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  background: ${({ theme }) => theme.color.secondary[100]};
  border-radius: 1rem;
`;

import styled from 'styled-components';

export const Layout = styled.div`
  cursor: pointer;

  display: flex;
  gap: 1rem;

  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.base};

  background: ${({ theme }) => theme.color.secondary[100]};
  border-radius: 1rem;
`;

import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.lg};
`;

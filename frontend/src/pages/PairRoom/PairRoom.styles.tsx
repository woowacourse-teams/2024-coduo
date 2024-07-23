import styled from 'styled-components';

export const Layout = styled.div`
  min-height: calc(100vh - 7rem);
  background: ${({ theme }) => theme.color.primary[100]};
`;

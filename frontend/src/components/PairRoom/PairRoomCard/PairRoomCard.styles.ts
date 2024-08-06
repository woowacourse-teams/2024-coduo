import styled from 'styled-components';

export const Layout = styled.div`
  flex: 1;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.color.black[10]};
  border-radius: 1.5rem;
`;

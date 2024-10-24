import styled from 'styled-components';

export const Layout = styled.div`
  width: 50%;
  min-width: 45rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: calc(100vh - 20rem);

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

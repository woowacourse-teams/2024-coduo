import styled from 'styled-components';

export const Layout = styled.div`
  flex: 1;

  width: 100%;
  border-radius: 1.5rem;

  background: ${({ theme }) => theme.color.black[10]};
`;

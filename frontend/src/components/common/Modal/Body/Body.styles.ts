import styled from 'styled-components';

export const Layout = styled.div`
  overflow-y: auto;
  margin: 4rem 0;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

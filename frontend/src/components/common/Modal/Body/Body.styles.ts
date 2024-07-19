import styled from 'styled-components';

export const Layout = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 4rem 0;
  line-height: 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

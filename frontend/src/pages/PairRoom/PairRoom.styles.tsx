import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  height: calc(100vh - 7rem);
  padding: 3rem;
  background: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
`;

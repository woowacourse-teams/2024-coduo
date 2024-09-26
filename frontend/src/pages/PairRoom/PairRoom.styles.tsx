import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  min-height: 56rem;
  max-height: calc(100vh - 11rem);
`;

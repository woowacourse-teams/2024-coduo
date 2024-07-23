import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  min-height: calc(100vh - 7rem);
  padding: 3rem;
  background: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 41vw;
`;

export const PairListCard = styled.div`
  display: flex;
  width: 18vw;
`;

export const PairRoleCard = styled.div`
  display: flex;
  height: 16rem;
`;

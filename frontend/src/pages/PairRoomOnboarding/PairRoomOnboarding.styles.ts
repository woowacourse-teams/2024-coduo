import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100%;
  height: calc(100vh - 7rem);

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
  height: 95%;
  padding: 4rem;
  border-radius: 4rem 4rem 0 0;

  background-color: ${({ theme }) => theme.color.black[10]};
`;

import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: calc(100vh - 7rem);

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 60%;
  height: 95%;
  padding: 4rem;

  background-color: ${({ theme }) => theme.color.black[10]};
  border-radius: 4rem 4rem 0 0;
`;

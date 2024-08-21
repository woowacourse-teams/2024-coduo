import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 7rem);

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12rem;

  width: 60%;
  padding: 4rem 4rem 12rem;

  background-color: ${({ theme }) => theme.color.black[10]};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 5rem;
`;

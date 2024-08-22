import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  height: calc(100vh - 7rem);
  padding: 20px;

  background-color: ${({ theme }) => theme.color.black[20]};
`;

export const LogoIconWithTitle = styled.img`
  width: 30rem;
  max-width: 40rem;
  margin: 5rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;

  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

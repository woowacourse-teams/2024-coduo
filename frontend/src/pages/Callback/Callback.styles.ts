import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  height: calc(100vh - 7rem);
  padding: 15rem 5rem;

  background-color: ${({ theme }) => theme.color.black[20]};
`;

export const LogoIcon = styled.img`
  width: 30rem;
  max-width: 40rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1.5;
  text-align: center;
`;

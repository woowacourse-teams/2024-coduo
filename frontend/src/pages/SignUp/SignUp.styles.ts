import styled, { css } from 'styled-components';

export const buttonStyles = css`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  height: calc(100vh - 7rem);
  padding: 15rem 5rem;

  background-color: ${({ theme }) => theme.color.black[20]};
`;

export const LogoIconWithTitle = styled.img`
  width: 30rem;
  max-width: 40rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.6rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

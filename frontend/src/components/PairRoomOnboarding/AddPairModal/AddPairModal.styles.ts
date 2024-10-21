import styled, { css } from 'styled-components';

export const buttonStyles = css`
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

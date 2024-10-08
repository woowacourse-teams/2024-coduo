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
  padding: 15rem;

  background-color: ${({ theme }) => theme.color.primary[100]};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: bold;
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;
  text-align: center;
`;

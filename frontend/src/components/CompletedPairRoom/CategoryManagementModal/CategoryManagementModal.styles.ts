import styled, { css } from 'styled-components';

export const inputStyles = css`
  width: 100%;

  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  width: 100%;
`;

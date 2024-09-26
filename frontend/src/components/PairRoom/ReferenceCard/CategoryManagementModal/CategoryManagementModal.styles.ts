import styled, { css } from 'styled-components';

export const inputStyles = css`
  width: 100%;

  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({ theme }) => theme.color.black[80]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Footer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  height: 7rem;
  padding-top: 2rem;
`;

export const AddNewCategoryInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

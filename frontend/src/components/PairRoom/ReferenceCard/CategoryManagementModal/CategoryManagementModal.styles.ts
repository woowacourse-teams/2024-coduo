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

  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Footer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`;

export const AddNewCategoryInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const buttonStyles = css`
  width: 4.4rem;
  height: 4rem;
  border-radius: 0.6rem;
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  width: 100%;
`;

export const CategoryInput = styled.input`
  width: 100%;
  border: 1px solid;
`;

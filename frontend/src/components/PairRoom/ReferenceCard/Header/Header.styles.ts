import styled, { css } from 'styled-components';

export const buttonStyles = css`
  width: fit-content;
  min-width: 6rem;
  padding: 0 1rem;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.lg};

  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

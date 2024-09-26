import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  height: 6rem;
  padding: 0 2rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 80%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const inputStyles = css`
  height: 4rem;
  border-radius: 0.6rem;
`;

export const buttonStyles = css`
  width: 4.4rem;
  height: 4rem;
  border-radius: 0.6rem;
`;

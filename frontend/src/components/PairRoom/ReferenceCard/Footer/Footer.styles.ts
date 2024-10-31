import styled, { css } from 'styled-components';

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;
  padding: 0 2rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[300]};
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

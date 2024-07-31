import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  padding: 4rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const inputStyles = css`
  height: 4rem;
  border-radius: 1rem;
`;

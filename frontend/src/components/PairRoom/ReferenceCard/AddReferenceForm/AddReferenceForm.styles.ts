import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 2rem;

  width: 75%;
  padding: 0 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const inputStyles = css`
  height: 4rem;
`;
export const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  height: 6rem;
  padding: 2rem;
  border-radius: 0 0 1.5rem 1.5rem;

  color: ${({ theme }) => theme.color.black[70]};
  font-size: ${({ theme }) => theme.fontSize.base};

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[20]};
  }
`;

export const ReferenceFormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  padding-left: 1rem;
`;

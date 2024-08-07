import styled, { css } from 'styled-components';

export const inputStyles = css`
  height: 4rem;
`;

export const Layout = styled.div`
  min-width: 49rem;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 25rem);
  min-height: 42rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const Form = styled.form`
  display: flex;
  gap: 4rem;
  align-items: center;

  width: 100%;
  padding: 0 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

export const FooterButton = styled.button`
  display: flex;
  gap: 1rem;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.black[70]};

  border-radius: 0 0 1.5rem 1.5rem;

  transition: all 0.2s ease 0s;

  &:hover {
    background-color: ${({ theme }) => theme.color.black[20]};
  }
`;

import styled, { css } from 'styled-components';

export const inputStyles = css`
  height: 4rem;
`;

export const Layout = styled.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 25rem);
  min-height: 42rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 4rem;

  width: 100%;
  padding: 0 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;
  min-height: 6rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
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

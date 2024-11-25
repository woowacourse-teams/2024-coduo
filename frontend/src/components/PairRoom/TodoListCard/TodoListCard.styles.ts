import styled, { css } from 'styled-components';

export const inputStyles = css`
  height: 4rem;
  border-radius: 0.6rem;
`;

export const Layout = styled.div`
  min-width: 49rem;
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 25rem)' : '0')};

  transition: height 0.3s;

  border-top: ${({ $isOpen, theme }) => $isOpen && `1px solid ${theme.color.black[100]}`};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;
  min-height: 6rem;
  border-radius: 0 0 1.5rem 1.5rem;

  background-color: ${({ theme }) => theme.color.black[0]};
  border-top: 1px solid ${({ theme }) => theme.color.black[100]};
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  padding: 0 2rem;
`;

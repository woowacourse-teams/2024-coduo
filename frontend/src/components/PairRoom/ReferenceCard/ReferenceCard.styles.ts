import styled from 'styled-components';

export const Layout = styled.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`;

export const Body = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 25rem)' : '0')};

  transition: height 0.3s;

  border-top: ${({ $isOpen, theme }) => $isOpen && `1px solid ${theme.color.black[30]}`};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;

  border-top: 1px solid ${({ theme }) => theme.color.black[30]};
`;

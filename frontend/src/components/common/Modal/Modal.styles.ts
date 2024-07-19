import styled, { keyframes, css } from 'styled-components';

import type { Position } from './Modal.type';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-0.2rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0.2rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Layout = styled.div<{ $position: Position }>`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: ${({ $position }) => ($position === 'bottom' ? 'flex-end' : 'center')};
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.3s ease;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.black[90]};
  opacity: 36%;
`;

const POSITION_MAPPER = {
  bottom: css`
    max-height: 90vh;
    border-radius: 4rem 4rem 0 0;
    margin: 0;
    animation: ${slideIn} 0.3s ease-in forwards;
  `,
  center: css`
    max-height: 70vh;
    border-radius: 4rem;
    margin: 0 3rem;
    animation: ${slideOut} 0.3s ease-in forwards;
  `,
};

export const CloseButton = styled.button`
  position: absolute;
  top: 3.5rem;
  right: 3.5rem;
`;

export const Container = styled.div<{ $position: Position }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.black[10]};
  padding: 4rem;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.1),
    0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 60%;
  ${({ $position }) => POSITION_MAPPER[$position]}
`;

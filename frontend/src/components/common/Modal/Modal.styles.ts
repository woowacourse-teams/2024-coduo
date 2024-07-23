import styled, { keyframes, css } from 'styled-components';

import type { Size, Position, BackdropType } from './Modal.type';

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

const backdropMapper = {
  opaque: css`
    background: ${({ theme }) => theme.color.black[90]};
    opacity: 36%;
  `,
  blur: css`
    background: ${({ theme }) => theme.color.black[90]};
    opacity: 36%;
    backdrop-filter: blur(10px);
  `,
  transparent: css`
    background: transparent;
  `,
};

export const Backdrop = styled.div<{ $backdropType: BackdropType }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  ${({ $backdropType }) => backdropMapper[$backdropType]}
`;

const sizeMapper: Record<Size, string> = {
  sm: '30%',
  md: '60%',
  lg: '90%',
};

const positionMapper = {
  bottom: css`
    max-height: 90vh;
    border-radius: 4rem 4rem 0 0;
    margin: 0;
  `,
  center: css`
    max-height: 70vh;
    border-radius: 4rem;
    margin: 0 3rem;
  `,
};

const animationMapper = {
  bottom: css`
    animation: ${slideIn} 0.3s ease-in forwards;
  `,
  center: css`
    animation: ${slideOut} 0.3s ease-in forwards;
  `,
};

export const Container = styled.div<{
  $size: Size | string;
  $height: string;
  $position: Position;
  $shadow: boolean;
  $animation: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.black[10]};
  padding: 4rem;
  box-shadow: ${({ $shadow }) =>
    $shadow &&
    ` 0px 3px 6px rgba(0, 0, 0, 0.1),
    0px 3px 6px rgba(0, 0, 0, 0.1)`};
  width: ${({ $size }) => sizeMapper[$size as Size] ?? $size};
  height: ${({ $height }) => $height && $height};
  ${({ $position }) => positionMapper[$position]}
  ${({ $position, $animation }) => $animation && animationMapper[$position]}
`;

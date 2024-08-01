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
  align-items: ${({ $position }) => ($position === 'BOTTOM' ? 'flex-end' : 'center')};
  justify-content: center;

  width: 100%;
  height: 100%;

  animation: ${fadeIn} 0.3s ease;
`;

const backdropMapper = {
  OPAQUE: css`
    opacity: 0.36;
    background: ${({ theme }) => theme.color.black[90]};
  `,
  BLUR: css`
    background: #00000080;
    backdrop-filter: blur(10px);
  `,
  TRANSPARENT: css`
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
  SM: '30%',
  MD: '60%',
  LG: '90%',
};

const positionMapper = {
  BOTTOM: css`
    max-height: 90vh;
    margin: 0;
    border-radius: 4rem 4rem 0 0;
  `,
  CENTER: css`
    max-height: 70vh;
    margin: 0 3rem;
    border-radius: 4rem;
  `,
};

const animationMapper = {
  BOTTOM: css`
    animation: ${slideIn} 0.3s ease-in forwards;
  `,
  CENTER: css`
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

  width: ${({ $size }) => sizeMapper[$size as Size] ?? $size};
  height: ${({ $height }) => $height && $height};
  padding: 4rem;

  background: ${({ theme }) => theme.color.black[10]};
  box-shadow: ${({ $shadow }) =>
    $shadow &&
    ` 0 3px 6px rgb(0 0 0 / 10%),
    0 3px 6px rgb(0 0 0 / 10%)`};

  ${({ $position }) => positionMapper[$position]}
  ${({ $position, $animation }) => $animation && animationMapper[$position]}
`;

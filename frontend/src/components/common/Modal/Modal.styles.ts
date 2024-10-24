import styled, { keyframes, css } from 'styled-components';

import { Z_INDEX } from '@/constants/style';

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
  display: flex;
  justify-content: center;
  align-items: ${({ $position }) => ($position === 'BOTTOM' ? 'flex-end' : 'center')};

  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.MODAL};

  width: 100%;
  height: 100%;

  animation: ${fadeIn} 0.3s ease;
`;

const backdropMapper = {
  OPAQUE: css`
    background: ${({ theme }) => theme.color.black[90]};
    opacity: 0.36;
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
  sm: '30%',
  md: '60%',
  lg: '90%',
};

const positionMapper = {
  BOTTOM: css`
    max-height: 90vh;
    margin: 0;
    border-radius: 2rem 2rem 0 0;
  `,
  CENTER: css`
    max-height: 70vh;
    margin: 0 3rem;
    border-radius: 2rem;
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
  display: flex;
  flex-direction: column;

  position: relative;

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

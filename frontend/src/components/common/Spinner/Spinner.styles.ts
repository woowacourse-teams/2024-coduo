import styled, { keyframes } from 'styled-components';

import { SpinnerColor, SpinnerSize } from '@/components/common/Spinner/Spinner.type';

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const spinnerSizes = {
  sm: '4rem',
  md: '8rem',
  lg: '12rem',
  xl: '16rem',
};

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: fit-content;
`;

export const Spinner = styled.div<{ $size: SpinnerSize }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: ${({ $size }) => spinnerSizes[$size]};
  min-height: ${({ $size }) => spinnerSizes[$size]};
`;

export const FirstBounce = styled.div<{ $size: SpinnerSize; $color: SpinnerColor }>`
  position: absolute;

  width: ${({ $size }) => spinnerSizes[$size]};
  margin: auto;
  border-radius: 50%;

  background-color: ${({ theme, $color }) => theme.color[$color][700]};
  opacity: 0.6;

  animation: ${bounce} 2s infinite ease-in-out;

  aspect-ratio: 1;
`;

export const SecondBounce = styled.div<{ $size: SpinnerSize; $color: SpinnerColor }>`
  position: absolute;

  width: ${({ $size }) => spinnerSizes[$size]};
  margin: auto;
  border-radius: 50%;

  background-color: ${({ theme, $color }) => theme.color[$color][700]};
  opacity: 0.6;

  animation: ${bounce} 2s infinite ease-in-out;

  aspect-ratio: 1;
  animation-delay: -1s;
`;

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

export const Spinner = styled.div<{ $size: SpinnerSize }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: ${({ $size }) => spinnerSizes[$size]};
  height: 100%;
  min-height: ${({ $size }) => spinnerSizes[$size]};
`;

export const FirstBounce = styled.div<{ $size: SpinnerSize; $color: SpinnerColor }>`
  position: absolute;

  aspect-ratio: 1;
  width: ${({ $size }) => spinnerSizes[$size]};
  margin: auto;

  opacity: 0.6;
  background-color: ${({ theme, $color }) => theme.color[$color][700]};
  border-radius: 50%;

  animation: ${bounce} 2s infinite ease-in-out;
`;

export const SecondBounce = styled.div<{ $size: SpinnerSize; $color: SpinnerColor }>`
  position: absolute;

  aspect-ratio: 1;
  width: ${({ $size }) => spinnerSizes[$size]};
  margin: auto;

  opacity: 0.6;
  background-color: ${({ theme, $color }) => theme.color[$color][700]};
  border-radius: 50%;

  animation: ${bounce} 2s infinite ease-in-out;
  animation-delay: -1s;
`;

import styled, { keyframes } from 'styled-components';

const skBounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

export const Spinner = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 4rem;
  height: 100%;
  min-height: 4rem;
`;

export const DoubleBounce1 = styled.div`
  position: absolute;

  aspect-ratio: 1;
  width: 4rem;
  margin: auto;

  opacity: 0.6;
  background-color: ${({ theme }) => theme.color.primary[800]};
  border-radius: 50%;

  animation: ${skBounce} 2s infinite ease-in-out;
`;

export const DoubleBounce2 = styled.div`
  position: absolute;

  aspect-ratio: 1;
  width: 4rem;
  margin: auto;

  opacity: 0.6;
  background-color: ${({ theme }) => theme.color.primary[800]};
  border-radius: 50%;

  animation: ${skBounce} 2s infinite ease-in-out;
  animation-delay: -1s;
`;

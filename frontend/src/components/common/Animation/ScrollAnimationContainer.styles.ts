import styled, { keyframes } from 'styled-components';

const frameInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100%{
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const Container = styled.div<{ $hasAnimated: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  width: 100%;

  &.frame-in {
    visibility: visible;

    animation: ${frameInAnimation} 1s forwards;
  }
`;

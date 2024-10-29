import styled, { css, keyframes } from 'styled-components';

interface FrameInAnimationProps {
  $animationDirection: 'left' | 'right' | 'top' | 'bottom';
  $animationDuration: number;
  $animationDelay: number;
}

const frameInAnimation = (direction: 'left' | 'right' | 'top' | 'bottom') => keyframes`
  0% {
    opacity: 0;
    transform: ${
      direction === 'left'
        ? 'translateX(100%)'
        : direction === 'right'
          ? 'translateX(-100%)'
          : direction === 'top'
            ? 'translateY(100%)'
            : 'translateY(-100%)'
    };
  }

  100%{
    opacity: 1;
    transform: translateX(0%) translateY(0%);
  }
`;

export const Container = styled.div<FrameInAnimationProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  width: fit-content;
  height: fit-content;

  opacity: 0;

  &.frame-in {
    visibility: visible;

    animation: ${(props) => css`
        ${frameInAnimation(props.$animationDirection)}
      `}
      ${(props) => props.$animationDuration}s forwards;
    animation-delay: ${(props) => props.$animationDelay}s;
  }
`;

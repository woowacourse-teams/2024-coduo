import styled, { css, keyframes } from 'styled-components';

import { Direction } from '@/components/common/Tooltip/Tooltip.type';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  top: 0.1rem;

  width: fit-content;
  height: fit-content;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;

    transition: all 0.75s ease;
  }
`;

const arrowStyle = css`
  content: '';

  position: absolute;
  border-width: 0.8rem;
  border-style: solid;
  filter: drop-shadow(0 0.2rem 0.2rem rgb(0 0 0 / 30%));
`;

const directionStyle = (direction: Direction, color: string) => {
  switch (direction) {
    case 'top':
      return css`
        bottom: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${arrowStyle}
          top: 100%;
          left: 50%;

          transform: translateX(-50%);
          border-color: ${color} transparent transparent transparent;
        }
      `;
    case 'bottom':
      return css`
        top: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${arrowStyle}
          bottom: 100%;
          left: 50%;

          transform: translateX(-50%);
          border-color: transparent transparent ${color} transparent;
        }
      `;
    case 'left':
      return css`
        top: 50%;
        right: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${arrowStyle}
          top: 50%;
          left: 100%;

          transform: translateY(-50%);
          border-color: transparent transparent transparent ${color};
        }
      `;
    case 'right':
      return css`
        top: 50%;
        left: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${arrowStyle}
          top: 50%;
          right: 100%;

          transform: translateY(-50%);
          border-color: transparent ${color} transparent transparent;
        }
      `;
  }
};

export const Content = styled.div<{ $color: string; $direction: Direction }>`
  display: none;

  position: absolute;
  z-index: 100;

  width: fit-content;
  min-width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;

  background-color: ${({ $color }) => $color};
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 30%);
  color: white;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 150%;
  text-align: center;
  word-break: keep-all;

  animation: ${fadeIn} 0.3s ease-in-out forwards;

  cursor: help;

  ${({ $color, $direction }) => directionStyle($direction, $color)};
`;

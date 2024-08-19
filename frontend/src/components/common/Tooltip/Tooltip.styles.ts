import { HiQuestionMarkCircle } from 'react-icons/hi';
import styled, { css, keyframes } from 'styled-components';

import { Direction } from '@/components/common/Tooltip/Tooltip.type';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`;

export const Box = styled.div`
  position: relative;

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
  left: 50%;

  transform: translateX(-50%);
  border-width: 0.8rem;
  border-style: solid;
  filter: drop-shadow(0 0.2rem 0.2rem rgb(0 0 0 / 30%));
`;

const directionStyle = ($direction: Direction, $color: string) => {
  switch ($direction) {
    case 'top':
      return css`
        bottom: 3.5rem;

        &::before {
          ${arrowStyle}
          top: 100%;
          border-color: ${$color} transparent transparent transparent;
        }
      `;
    case 'bottom':
      return css`
        top: 3.5rem;

        &::before {
          ${arrowStyle}
          bottom: 100%;
          border-color: transparent transparent ${$color};
        }
      `;
  }
};

export const Content = styled.div<{ $color: string; $direction: Direction }>`
  display: none;

  cursor: help;

  position: absolute;
  z-index: 100;

  text-align: center;

  width: fit-content;
  min-width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;

  background-color: ${({ $color }) => $color};
  color: white;
  font-size: ${({ theme }) => theme.fontSize.sm};

  animation: ${fadeIn} 0.3s ease-in-out forwards;
  transform: translate(-50%);

  left: 50%;
  content: attr(aria-label);
  text-transform: none;

  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 30%);
  line-height: 150%;
  word-break: keep-all;
  ${({ $color, $direction }) => directionStyle($direction, $color)};
`;

export const QuestionIcon = styled(HiQuestionMarkCircle)<{ $color: string }>`
  width: 2rem;
  height: 2rem;

  color: ${({ $color }) => $color};

  cursor: help;

  &:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`;

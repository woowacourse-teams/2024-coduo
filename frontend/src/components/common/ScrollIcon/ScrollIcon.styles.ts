import { RiArrowDownDoubleLine } from 'react-icons/ri';
import styled, { css, keyframes } from 'styled-components';

import { Z_INDEX } from '@/constants/style';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

interface ScrollIconProps {
  $isBottom: boolean;
}

const getTransformStyle = ({ $isBottom }: ScrollIconProps) => {
  return $isBottom
    ? css`
        transform: rotate(180deg);
      `
    : css`
        transform: rotate(0deg);
      `;
};

export const Layout = styled.div<{ $isBottom: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  position: fixed;
  bottom: 2rem;
  left: calc(50% - 3rem);
  z-index: ${Z_INDEX.PLUS};

  padding: 1.5rem;
  border-radius: 3rem;

  opacity: 0.7;
  font-size: 2rem;

  animation: ${bounce} 1.5s infinite;
  transition: opacity 0.2s ease-in-out;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const ScrollIcon = styled(RiArrowDownDoubleLine)<{ $isBottom: boolean }>`
  color: ${({ theme }) => theme.color.primary[800]};

  transition: transform 0.3s ease-in-out;
  ${getTransformStyle}
`;

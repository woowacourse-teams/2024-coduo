import { IoIosArrowBack } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

export const Layout = styled(PairRoomCard.Header)`
  p {
    height: 4.8rem;

    white-space: nowrap;
  }
`;

export const expandButton = css`
  position: absolute;
  right: 1rem;

  width: 4rem;
  height: 4rem;
  border: none;

  background-color: ${({ theme }) => theme.color.black[100]};
  color: ${({ theme }) => theme.color.black[900]};

  &:hover {
    border: none;

    background-color: ${({ theme }) => theme.color.black[300]};
  }

  &:active {
    border: none;

    background-color: ${({ theme }) => theme.color.black[500]};
  }
`;

export const ArrowIcon = styled(IoIosArrowBack)<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.color.black[900]};

  transform: rotate(${({ $isOpen }) => ($isOpen ? 0 : 180)}deg);
  transition: transform 0.2s ease-in-out;
`;

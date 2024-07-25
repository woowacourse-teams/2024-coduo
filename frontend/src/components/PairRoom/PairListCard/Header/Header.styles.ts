import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

export const Layout = styled(PairRoomCard.Header)`
  p {
    height: 4.8rem;
    white-space: nowrap;
  }
`;

export const ArrowIcon = styled(IoIosArrowBack)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? 0 : 180)}deg);
  transition: transform 0.2s ease-in-out;
`;

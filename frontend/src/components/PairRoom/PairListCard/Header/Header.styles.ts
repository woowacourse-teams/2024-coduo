import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';

export const Layout = styled(PairRoomCard.Header)<{ $isOpen: boolean }>`
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};

  padding: ${({ $isOpen }) => ($isOpen ? '2rem 1rem 2rem 2rem' : '0')};
`;

export const ArrowIcon = styled(IoIosArrowBack)<{ $isOpen: boolean }>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? 0 : 180)}deg);
  transition: transform 0.2s ease-in-out;
`;

import styled from 'styled-components';

import { Position, Direction } from '@/components/common/Modal/Footer/Footer';

const positionMapper = {
  LEFT: 'start',
  CENTER: 'center',
  RIGHT: 'end',
};

export const Layout = styled.div<{ $direction: Direction; $position: Position }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: 1.6rem;
  align-items: ${({ $direction, $position }) => $direction === 'COLUMN' && positionMapper[$position]};
  justify-content: ${({ $direction, $position }) => $direction === 'ROW' && positionMapper[$position]};
`;

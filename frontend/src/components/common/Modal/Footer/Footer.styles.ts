import styled from 'styled-components';

import { Direction } from '@/components/common/Modal/Footer/Footer';

const directionMapper = {
  left: 'start',
  center: 'center',
  right: 'end',
};

export const Layout = styled.div<{ $direction: Direction }>`
  display: flex;
  justify-content: ${({ $direction }) => directionMapper[$direction]};
  gap: 1.6rem;
`;

export const CancelButton = styled.button`
  width: 10rem;
  height: 4rem;
  border: 1px solid ${({ theme }) => theme.color.primary[500]};
  border-radius: 1rem;
  color: ${({ theme }) => theme.color.primary[500]};
  font-size: ${({ theme }) => theme.fontSize.base};
  text-align: center;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  width: 10rem;
  height: 4rem;
  background: ${({ theme }) => theme.color.primary[500]};
  border-radius: 1rem;
  color: ${({ theme }) => theme.color.black[10]};
  font-size: ${({ theme }) => theme.fontSize.base};
  text-align: center;
  cursor: pointer;
`;

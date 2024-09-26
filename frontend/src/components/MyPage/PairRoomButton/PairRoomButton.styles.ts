import styled, { keyframes, css } from 'styled-components';

import type { PairRoomStatus } from '@/apis/pairRoom';

const flow = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const Layout = styled.button<{ $status: PairRoomStatus }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  position: relative;

  width: 100%;
  padding: 3rem;
  border-radius: 1rem;

  font-size: ${({ theme }) => theme.fontSize.base};

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
    border-radius: 1rem;

    background: ${({ $status, theme }) =>
      $status === 'IN_PROGRESS'
        ? `linear-gradient(
      120deg,
      ${theme.color.secondary[100]} 0 75%,
      ${theme.color.secondary[600]} 75% 100%
    )`
        : `linear-gradient(
      120deg,
      ${theme.color.black[30]} 0 75%,
      ${theme.color.black[60]} 75% 100%
    )`};
    opacity: 0.7;

    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const RoleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RoleText = styled.p<{ $status: PairRoomStatus }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  span {
    color: ${({ $status, theme }) => ($status === 'IN_PROGRESS' ? theme.color.secondary[600] : theme.color.black[70])};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const inProgressText = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.black[60]},
    ${({ theme }) => theme.color.black[70]},
    ${({ theme }) => theme.color.black[60]}
  );

  animation: ${flow} 4s linear infinite;
  background-size: 200% 100%;
  background-clip: text;
`;

export const StatusText = styled.p<{ $status: PairRoomStatus }>`
  color: ${({ $status, theme }) => ($status === 'IN_PROGRESS' ? 'transparent' : theme.color.black[70])};
  font-size: ${({ theme }) => theme.fontSize.base};
  letter-spacing: 0.15rem;

  ${({ $status }) => $status === 'IN_PROGRESS' && inProgressText}
`;

export const ConnectText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  color: ${({ theme }) => theme.color.black[10]};
`;

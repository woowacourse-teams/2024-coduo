import { Link } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';
import styled, { keyframes, css } from 'styled-components';

import type { PairRoomStatus } from '@/apis/pairRoom';

import { Z_INDEX } from '@/constants/style';

const flow = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const commonTextStyles = css`
  font-size: ${({ theme }) => theme.fontSize.base};

  transition: color 0.7s ease;
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

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;

  width: 100%;
`;

export const LinkWrapper = styled(Link)`
  width: 100%;
`;

export const StatusText = styled.p<{ $status: PairRoomStatus }>`
  width: 15%;

  ${commonTextStyles}
  color: ${({ $status, theme }) => ($status === 'IN_PROGRESS' ? 'transparent' : theme.color.black[70])};
  letter-spacing: 0.15rem;
  text-align: left;

  ${({ $status }) => $status === 'IN_PROGRESS' && inProgressText}

  &:hover {
    color: white;
  }
`;

export const RoleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 50%;
`;

export const RoleText = styled.p<{ $status: PairRoomStatus; $color: 'secondary' | 'primary' }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  transition: color 0.7s ease;

  span {
    color: ${({ $status, theme, $color }) =>
      $status === 'IN_PROGRESS' ? theme.color[$color][600] : theme.color.black[70]};
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    transition: color 0.7s ease;
  }
`;

export const ConnectText = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 0.4rem;

  width: 11%;

  color: ${({ theme }) => theme.color.black[10]};

  transition: color 0.7s ease;
`;

export const PairRoomButton = styled.button<{ $status: PairRoomStatus; $color: 'secondary' | 'primary' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  position: relative;

  width: 100%;
  padding: 3rem;
  border-radius: 1rem;

  font-size: ${({ theme }) => theme.fontSize.base};

  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: ${Z_INDEX.MINUS};

    width: 100%;
    height: 100%;
    border-radius: 1rem;

    background-color: ${({ $status, $color, theme }) =>
      $status === 'IN_PROGRESS' ? theme.color[$color][100] : theme.color.black[30]};
    background-image: ${({ $status, theme, $color }) =>
      $status === 'IN_PROGRESS'
        ? `linear-gradient(
      90deg,
      ${theme.color[$color][100]} 0 75%,
      ${theme.color[$color][600]} 75% 100%
    )`
        : `linear-gradient(
      90deg,
      ${theme.color.black[30]} 0 75%,
      ${theme.color.black[60]} 75% 100%
    )`};
    background-size: 400% 100%;

    background-position: 72.5% 0;
    opacity: 0.7;

    transition:
      background-position 0.5s ease,
      opacity 0.2s ease;
  }

  &:hover::before {
    background-position: 105.8% 0;
    opacity: 1;
  }

  &:hover ${StatusText} {
    color: white;
    ${({ $status }) =>
      $status === 'IN_PROGRESS' &&
      css`
        animation: ${flow} 4s linear infinite;
      `}
  }
  &:hover ${RoleText} {
    color: ${({ theme }) => theme.color.black[20]};

    span {
      color: ${({ theme }) => theme.color.black[10]};
    }
  }

  &:hover ${ConnectText} {
    color: ${({ theme }) => theme.color.black[70]};
  }
`;

export const DeleteButton = styled(FaTrashAlt)`
  color: ${({ theme }) => theme.color.black[60]};
  font-size: 1.6rem;

  transition: color 0.3s ease;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.danger[600]};
  }
`;

export const DangerText = styled.span`
  color: ${({ theme }) => theme.color.danger[600]};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.5;
`;

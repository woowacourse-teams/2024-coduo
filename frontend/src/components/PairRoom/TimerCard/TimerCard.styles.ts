import { FaPause, FaPlay } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;

  min-width: 60rem;
  height: 100%;
  padding: 2rem;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1;
  width: 45vh;
  min-width: 28rem;
  height: 45vh;
  min-height: 28rem;

  background-image: linear-gradient(white, white),
    conic-gradient(
      ${({ theme, $progress }) => `${theme.color.primary[500]} ${$progress}%, ${theme.color.black[30]} ${$progress}%`}
    );
  background-clip: content-box, border-box;
  background-origin: border-box;
  border: 0.8rem solid transparent;
  border-radius: 50%;

  transition: background-image 1s ease-in;
`;

export const Timer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

export const TimerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  width: 10rem;

  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const TimerText = styled.p`
  font-size: 7rem;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 5rem;
`;

export const IconButton = styled.button`
  width: ${({ theme }) => theme.fontSize.h4};
  font-size: ${({ theme }) => theme.fontSize.h4};
  background: transparent;
`;

const iconStyle = css<{ $isActive: boolean }>`
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.color.secondary[500] : theme.color.black[50])};
`;

export const PlayIcon = styled(FaPlay)<{ $isActive: boolean }>`
  ${iconStyle}
`;

export const PauseIcon = styled(FaPause)<{ $isActive: boolean }>`
  ${iconStyle}
`;

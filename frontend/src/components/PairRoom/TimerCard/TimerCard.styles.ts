import { FaPause, FaPlay, FaStop } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28vw;
  height: 28vw;
  max-width: 100%;
  max-height: 100%;
  border: 0.8rem solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(white, white),
    conic-gradient(
      ${({ theme, $progress }) => `${theme.color.primary[500]} ${$progress}%, ${theme.color.black[30]} ${$progress}%`}
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  transition: background-image 1s ease-in;
`;

export const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const TimerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
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
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.h4};
`;

const iconStyle = css<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.color.secondary[500] : theme.color.black[50])};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
`;

export const PlayIcon = styled(FaPlay)<{ $isActive: boolean }>`
  ${iconStyle}
`;

export const PauseIcon = styled(FaPause)<{ $isActive: boolean }>`
  ${iconStyle}
`;

export const StopIcon = styled(FaStop)<{ $isActive: boolean }>`
  ${iconStyle}
`;

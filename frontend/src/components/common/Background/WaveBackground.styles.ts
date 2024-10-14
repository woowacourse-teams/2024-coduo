import styled, { keyframes } from 'styled-components';

const drift = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const WaveBackground = styled.div`
  overflow: hidden;

  position: fixed;
  z-index: -1;

  width: 100vw;
  height: calc(100vh - 7rem);
`;

const WaveBase = styled.div`
  position: absolute;
  bottom: calc(30vh);
  left: calc(-40vw);

  width: 150%;
  border-radius: 43%;

  opacity: 0.3;

  aspect-ratio: 1 / 1;

  transform-origin: 50% 48%;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 180%;
  }
`;

export const Wave = styled(WaveBase)`
  background: ${({ theme }) => theme.color.primary[300]};

  animation: ${drift} 40s infinite linear;
`;

export const WaveTwo = styled(WaveBase)`
  background: ${({ theme }) => theme.color.primary[200]};

  animation: ${drift} 13s infinite linear;
`;

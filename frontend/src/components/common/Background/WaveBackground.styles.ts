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

  width: 110%;
  border-radius: 43%;

  aspect-ratio: 1 / 1;

  transform-origin: 50% 48%;
`;

export const Wave = styled(WaveBase)`
  top: -130%;
  left: -15%;

  background: ${({ theme }) => theme.color.primary[300]};
  opacity: 0.3;

  animation: ${drift} 40s infinite linear;
`;

export const WaveTwo = styled(WaveBase)`
  top: -130%;
  left: -15%;

  background: ${({ theme }) => theme.color.primary[200]};
  opacity: 0.3;

  animation: ${drift} 13s infinite linear;
`;

import styled from 'styled-components';

export const HiddenMessage = styled.p`
  overflow: hidden;

  position: fixed;
  top: -100rem;

  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;

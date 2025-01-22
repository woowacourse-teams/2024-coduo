import styled from 'styled-components';

import { Z_INDEX } from '@/constants/style';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  position: fixed;
  top: 9rem;
  right: 2rem;
  z-index: ${Z_INDEX.TOAST};
`;

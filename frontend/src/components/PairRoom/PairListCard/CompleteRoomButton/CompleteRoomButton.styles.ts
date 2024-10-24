import styled from 'styled-components';

import Tooltip from '@/components/common/Tooltip/Tooltip';

export const Layout = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 6rem;
  margin-top: auto;
  border-radius: 0 0 2rem 2rem;

  background-color: ${({ theme, disabled }) => (disabled ? theme.color.black[20] : theme.color.danger[200])};
  color: ${({ theme, disabled }) => (disabled ? theme.color.black[60] : theme.color.danger[600])};
  font-size: ${({ theme }) => theme.fontSize.base};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const StyledTooltip = styled(Tooltip)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const TextWrapper = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

import styled, { css, keyframes, RuleSet } from 'styled-components';

import type { Status } from './Toast';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const pushDown = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`;

const backgroundMapper: Record<Status, RuleSet<object>> = {
  SUCCESS: css`
    background-color: ${({ theme }) => theme.color.success[500]};
  `,
  INFO: css`
    background-color: ${({ theme }) => theme.color.info[500]};
  `,
  WARNING: css`
    background-color: ${({ theme }) => theme.color.warning[500]};
  `,
  ERROR: css`
    background-color: ${({ theme }) => theme.color.danger[500]};
  `,
};

export const Layout = styled.div<{ $isOpen: boolean; $isPush: boolean; $status: Status }>`
  display: flex;
  align-items: center;

  width: 30rem;
  min-height: 5rem;
  padding: 1.2rem 1.8rem;

  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.color.black[10]};

  border-radius: 1.5rem;

  animation:
    ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.8s none,
    ${({ $isPush }) => $isPush && pushDown} 0.5s none;

  ${({ $status }) => backgroundMapper[$status]};
`;

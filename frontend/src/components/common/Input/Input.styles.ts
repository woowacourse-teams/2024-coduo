import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps {
  $status: InputStatus;
  $css?: ReturnType<typeof css>;
}

interface LayoutProps {
  $width: string;
}

const inputStatusCss = {
  DEFAULT: css`
    background-color: ${({ theme }) => theme.color.black[10]};
    border: 1px solid ${({ theme }) => theme.color.black[40]};
  `,
  ERROR: css`
    background-color: ${({ theme }) => theme.color.danger[50]};
    border: 1px solid ${({ theme }) => theme.color.danger[600]};
  `,
  SUCCESS: css`
    background-color: ${({ theme }) => theme.color.success[100]};
    border: 1px solid ${({ theme }) => theme.color.success[600]};
  `,
};

const inputStatusMessageCss = {
  DEFAULT: css`
    color: ${({ theme }) => theme.color.black[80]};
  `,
  ERROR: css`
    color: ${({ theme }) => theme.color.danger[600]};
  `,

  SUCCESS: css`
    color: ${({ theme }) => theme.color.success[700]};
  `,
};

export const Layout = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: ${({ $width }) => $width};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primary[700]};
`;

export const Message = styled.p<{ $status: InputStatus }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ $status }) => inputStatusMessageCss[$status]};
`;

export const Input = styled.input<InputProps>`
  ${({ $status }) => inputStatusCss[$status]};
  ${({ $status }) => inputStatusCss[$status]};
  width: 100%;
  height: 4.8rem;
  padding: 0 1rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  border-radius: 0.5rem;

  &:focus {
    background-color: ${({ theme }) => theme.color.black[10]};
    border: 1px solid ${({ theme }) => theme.color.primary[700]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.black[30]};
    border: 1px solid ${({ theme }) => theme.color.black[40]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.primary[700]};
  }

  ${(props) => props.$css}
`;

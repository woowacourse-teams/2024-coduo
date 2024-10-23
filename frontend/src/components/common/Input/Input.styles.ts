import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps {
  $status: InputStatus;
  $height: string;
  $css?: ReturnType<typeof css>;
}

interface LayoutProps {
  $width: string;
}

const inputStatusCss = {
  DEFAULT: css`
    border: 1px solid ${({ theme }) => theme.color.black[40]};

    background-color: ${({ theme }) => theme.color.black[10]};
  `,
  ERROR: css`
    border: 1px solid ${({ theme }) => theme.color.danger[600]};

    background-color: ${({ theme }) => theme.color.danger[50]};
  `,
  SUCCESS: css`
    border: 1px solid ${({ theme }) => theme.color.success[600]};

    background-color: ${({ theme }) => theme.color.success[100]};
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
  gap: 0.8rem;

  width: ${({ $width }) => $width};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Message = styled.p<{ $status: InputStatus }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ $status }) => inputStatusMessageCss[$status]};
`;

export const Input = styled.input<InputProps>`
  ${({ $status }) => inputStatusCss[$status]};
  ${({ $status }) => inputStatusCss[$status]};
  width: 100%;
  height: ${({ $height }) => $height};
  padding: 0 1rem;
  border-radius: 0.5rem;

  font-size: ${({ theme }) => theme.fontSize.md};

  &::placeholder {
    color: ${({ theme }) => theme.color.black[50]};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary[700]};

    background-color: ${({ theme }) => theme.color.black[10]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[40]};

    background-color: ${({ theme }) => theme.color.black[30]};
  }

  ${(props) => props.$css}
`;

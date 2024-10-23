import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/common/Input/Input.type';

const messageStatusStyles = {
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

const inputStatusStyles = {
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

export const Layout = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  position: relative;

  width: ${({ $width }) => $width};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.color.primary[700]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Message = styled.p<{ $height: string; $status: InputStatus }>`
  ${({ $status }) => messageStatusStyles[$status]};
  position: absolute;
  top: ${({ $height }) => $height};

  margin-top: 0.8rem;

  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Input = styled.input<{
  $css?: ReturnType<typeof css>;
  $width: string;
  $height: string;
  $status: InputStatus;
}>`
  ${({ $status }) => inputStatusStyles[$status]};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 0 1.2rem;
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

  ${({ $css }) => $css}
`;

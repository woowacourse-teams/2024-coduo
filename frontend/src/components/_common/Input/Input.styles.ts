import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/_common/Input/Input.type';

const messageStatusStyles = {
  DEFAULT: css`
    color: ${({ theme }) => theme.color.black[700]};
  `,
  ERROR: css`
    color: ${({ theme }) => theme.color.danger[700]};
  `,
  SUCCESS: css`
    color: ${({ theme }) => theme.color.success[700]};
  `,
};

const inputStatusStyles = {
  DEFAULT: css`
    border: 1px solid ${({ theme }) => theme.color.black[200]};

    background-color: ${({ theme }) => theme.color.black[0]};
  `,
  ERROR: css`
    border: 1px solid ${({ theme }) => theme.color.danger[700]};

    background-color: ${({ theme }) => theme.color.danger[10]};
  `,
  SUCCESS: css`
    border: 1px solid ${({ theme }) => theme.color.success[700]};

    background-color: ${({ theme }) => theme.color.success[10]};
  `,
};

export const Layout = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: ${({ $width }) => $width};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  position: relative;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.color.primary[800]};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Message = styled.p<{ $css?: ReturnType<typeof css>; $height: string; $status: InputStatus }>`
  ${({ $status }) => messageStatusStyles[$status]};
  position: absolute;
  top: ${({ $height }) => $height};

  margin-top: 0.6rem;
  margin-left: 0.2rem;

  font-size: ${({ theme }) => theme.fontSize.sm};

  ${({ $css }) => $css}
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
    color: ${({ theme }) => theme.color.black[200]};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary[800]};

    background-color: ${({ theme }) => theme.color.black[0]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[400]};

    background-color: ${({ theme }) => theme.color.black[300]};
  }

  ${({ $css }) => $css}
`;

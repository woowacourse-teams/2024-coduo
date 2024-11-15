import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/_common/InputField/InputField.type';

const inputStatusStyles = {
  DEFAULT: css`
    border: 1px solid ${({ theme }) => theme.color.black[300]};

    background-color: ${({ theme }) => theme.color.black[0]};
  `,
  ERROR: css`
    border: 1px solid ${({ theme }) => theme.color.danger[500]};

    background-color: ${({ theme }) => theme.color.danger[10]};
  `,
  SUCCESS: css`
    border: 1px solid ${({ theme }) => theme.color.success[500]};

    background-color: ${({ theme }) => theme.color.success[10]};
  `,
};

export const InputContainer = styled.div<{
  $css?: ReturnType<typeof css>;
  $width: string;
  $height: string;
  $status: InputStatus;
  $borderRadius: string;
  $color: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  ${({ $status }) => inputStatusStyles[$status]};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 0 1.4rem;
  border-radius: ${({ $borderRadius }) => $borderRadius};

  font-size: ${({ theme }) => theme.fontSize.md};

  &:focus-within {
    border: 1px solid ${({ $color }) => $color};

    background-color: ${({ theme }) => theme.color.black[0]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[300]};

    background-color: ${({ theme }) => theme.color.black[50]};
  }
  ${({ $css }) => $css}
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.color.black[300]};
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
`;

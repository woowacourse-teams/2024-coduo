import styled, { css } from 'styled-components';

import type { InputStatus } from '@/components/_common/InputField/InputField.type';

const inputStatusStyles = {
  DEFAULT: css`
    border: 1.5px solid #e5e5e5;

    background-color: ${({ theme }) => theme.color.black[100]};
  `,
  ERROR: css`
    border: 1.5px solid ${({ theme }) => theme.color.danger[400]};

    background-color: ${({ theme }) => theme.color.danger[100]};
  `,
  SUCCESS: css`
    border: 1.5px solid ${({ theme }) => theme.color.success[400]};

    background-color: ${({ theme }) => theme.color.success[100]};
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
  padding: 0 1.2rem;
  border-radius: ${({ $borderRadius }) => $borderRadius};

  font-size: ${({ theme }) => theme.fontSize.md};

  &::placeholder {
    color: ${({ theme }) => theme.color.black[500]};
  }

  &:focus-within {
    border: 1.5px solid ${({ $color }) => $color};

    background-color: ${({ theme }) => theme.color.black[100]};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[400]};

    background-color: ${({ theme }) => theme.color.black[300]};
  }
  ${({ $css }) => $css}
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
`;

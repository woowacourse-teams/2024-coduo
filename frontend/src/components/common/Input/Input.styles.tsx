import styled, { css } from 'styled-components';

import { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps {
  $status: InputStatus;
  $width: string;
  $height: string;
}

const inputStatusCss = {
  default: css`
    border: 1px solid ${({ theme }) => theme.color.black[40]};
    background-color: ${({ theme }) => theme.color.black[10]};
  `,
  error: css`
    border: 1px solid ${({ theme }) => theme.color.danger[600]};
    background-color: ${({ theme }) => theme.color.danger[100]};
  `,
  success: css`
    border: 1px solid ${({ theme }) => theme.color.success[600]};
    background-color: ${({ theme }) => theme.color.success[100]};
  `,
};

const inputStatusMessageCss = {
  default: css`
    color: ${({ theme }) => theme.color.black[80]};
  `,
  error: css`
    color: ${({ theme }) => theme.color.danger[700]};
  `,

  success: css`
    color: ${({ theme }) => theme.color.success[700]};
  `,
};

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.primary[700]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const Message = styled.p<{ $status: InputStatus }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ $status }) => inputStatusMessageCss[$status]};
`;

export const Input = styled.input<InputProps>`
  ${({ $status }) => inputStatusCss[$status]};
  ${({ $status }) => inputStatusCss[$status]};

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: 0 1rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.primary[700]};
    background-color: ${({ theme }) => theme.color.black[10]};
  }
  &:disabled {
    border: 1px solid ${({ theme }) => theme.color.black[40]};
    background-color: ${({ theme }) => theme.color.black[30]};
  }
`;

import styled, { css } from 'styled-components';

import { InputStatus } from '@/components/_common/InputGroup/Input.type';

const messageStatusStyles = {
  DEFAULT: css`
    color: ${({ theme }) => theme.color.black[800]};
  `,
  ERROR: css`
    color: ${({ theme }) => theme.color.danger[600]};
  `,
  SUCCESS: css`
    color: ${({ theme }) => theme.color.success[700]};
  `,
};

export const Message = styled.p<{ $css?: ReturnType<typeof css>; $status: InputStatus; $fontSize: string }>`
  ${({ $status }) => messageStatusStyles[$status]};
  font-size: ${({ $fontSize }) => $fontSize};

  ${({ $css }) => $css}
`;

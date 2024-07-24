import { forwardRef, InputHTMLAttributes } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/common/Input/Input.styles';
import { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  status?: InputStatus;
  message?: string;
  label: string;
  $css?: ReturnType<typeof css>;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width = '100%', status = 'default', message, label, ...props }: InputProps, ref) => {
    return (
      <S.Layout $width={width}>
        <S.Label htmlFor={props.id}>{label}</S.Label>
        <S.Input ref={ref} $status={status} {...props} />
        {message && <S.Message $status={status}>{message}</S.Message>}
      </S.Layout>
    );
  },
);

Input.displayName = 'InputComponent';

export default Input;

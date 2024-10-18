import { forwardRef, InputHTMLAttributes } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/common/Input/Input.styles';
import type { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  status?: InputStatus;
  label?: string;
  message?: string;
  $css?: ReturnType<typeof css>;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width = '100%', status = 'DEFAULT', message, label, height = '4.8rem', ...props }: InputProps, ref) => {
    return (
      <S.Layout $width={width}>
        {label && <S.Label htmlFor={props.id}>{label}</S.Label>}
        <S.Input ref={ref} $status={status} $height={height} {...props} />
        {message && (
          <S.Message role="alert" aria-live="assertive" aria-atomic="true" $status={status}>
            {message}
          </S.Message>
        )}
      </S.Layout>
    );
  },
);

Input.displayName = 'InputComponent';

export default Input;

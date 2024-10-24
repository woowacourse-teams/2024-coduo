import { forwardRef, InputHTMLAttributes } from 'react';

import { css } from 'styled-components';

import * as S from '@/components/common/Input/Input.styles';
import type { InputStatus } from '@/components/common/Input/Input.type';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: InputStatus;
  message?: string;

  $css?: ReturnType<typeof css>;
  width?: string;
  height?: string;

  $messageCss?: ReturnType<typeof css>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { width = '100%', status = 'DEFAULT', message, label, height = '4.8rem', $messageCss, ...props }: InputProps,
    ref,
  ) => {
    return (
      <S.Layout $width={width}>
        {label && <S.Label htmlFor={props.id}>{label}</S.Label>}
        <S.Container>
          <S.Input ref={ref} $status={status} $width={width} $height={height} {...props} />
          {message && (
            <S.Message
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              $height={height}
              $status={status}
              $css={$messageCss}
            >
              {message}
            </S.Message>
          )}
        </S.Container>
      </S.Layout>
    );
  },
);

Input.displayName = 'Input';

export default Input;

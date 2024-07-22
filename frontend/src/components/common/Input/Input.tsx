import { forwardRef, InputHTMLAttributes } from 'react';

import * as S from '@/components/common/Input/Input.styles';
import { InputStatus } from '@/components/common/Input/Input.type';

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  status?: InputStatus;
  message?: string;
  id: string;
  label: string;
}
const Input = forwardRef<HTMLInputElement, InputProp>(
  (
    { width = '80%', height = '4.8rem', status = 'default', message, id, label, ...props }: InputProp,
    ref,
  ): JSX.Element => {
    return (
      <S.Layout>
        <S.Label htmlFor={id}>{label}</S.Label>
        <S.Input ref={ref} id={id} $width={width} $height={height} $status={status} {...props} />
        {message && <S.Message $status={status}>{message}</S.Message>}
      </S.Layout>
    );
  },
);

Input.displayName = 'InputComponent';

export default Input;

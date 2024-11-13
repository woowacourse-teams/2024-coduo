import { forwardRef, InputHTMLAttributes } from 'react';

import { css } from 'styled-components';

import type { InputStatus } from '@/components/_common/InputGroup/Input.type';

import { theme } from '@/styles/theme';

import * as S from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  $css?: ReturnType<typeof css>;
  status?: InputStatus;
  width?: string;
  height?: string;
  borderRadius?: string;
  focusColor?: string;
  onReset?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      width = '100%',
      status = 'DEFAULT',
      height = '4.8rem',
      borderRadius = '0.5rem',
      focusColor = theme.color.primary[700],
      value,
      onReset,
      $css,

      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <S.InputContainer
        $status={status}
        $width={width}
        $height={height}
        $borderRadius={borderRadius}
        $focusColor={focusColor}
        $css={$css}
      >
        <S.Input value={value} ref={ref} {...props} />
        {onReset && value && <button onClick={onReset}>x</button>}
      </S.InputContainer>
    );
  },
);

Input.displayName = 'Input';

export default Input;

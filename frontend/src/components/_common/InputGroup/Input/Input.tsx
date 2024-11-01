import { forwardRef, InputHTMLAttributes } from 'react';

import { css } from 'styled-components';

import type { InputStatus } from '@/components/_common/InputGroup/Input.type';

import { theme } from '@/styles/theme';

import * as S from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: InputStatus;
  $css?: ReturnType<typeof css>;
  width?: string;
  height?: string;
  borderRadius?: string;
  focusColor?: string;
  onReset?: () => void;
  gap?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      width = '100%',
      status = 'DEFAULT',
      height = '4.8rem',
      borderRadius = '0.5rem',
      focusColor = theme.color.primary[800],
      onReset,
      $css,
      children,
      gap = '1rem',
      ...props
    }: React.PropsWithChildren<InputProps>,
    ref,
  ) => {
    return (
      <S.Layout $gap={gap}>
        <S.InputContainer
          $focusColor={focusColor}
          ref={ref}
          $status={status}
          $width={width}
          $height={height}
          $borderRadius={borderRadius}
          $css={$css}
        >
          <S.Input {...props} />
          {onReset && <button onClick={onReset}>x</button>}
        </S.InputContainer>
        {children}
      </S.Layout>
    );
  },
);

Input.displayName = 'Input';

export default Input;

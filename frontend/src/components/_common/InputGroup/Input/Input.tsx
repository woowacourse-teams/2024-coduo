import { InputHTMLAttributes } from 'react';

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
  color?: 'PRIMARY' | 'SECONDARY';
  onReset?: () => void;
}

const Input = ({
  width = '100%',
  status = 'DEFAULT',
  height = '4.8rem',
  borderRadius = '0.5rem',
  color = 'PRIMARY',
  value,
  onReset,
  $css,
  ...props
}: InputProps) => {
  return (
    <S.InputContainer
      $status={status}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $color={color === 'PRIMARY' ? theme.color.primary[700] : theme.color.secondary[700]}
      $css={$css}
    >
      <S.Input value={value} {...props} />
      {onReset && value && <button onClick={onReset}>x</button>}
    </S.InputContainer>
  );
};

export default Input;

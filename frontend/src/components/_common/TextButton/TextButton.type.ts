import { css } from 'styled-components';

type ButtonSize = 'base' | 'sm' | 'md' | 'lg' | 'xl' | string;

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: ButtonSize;
  color?: string;
  $css?: ReturnType<typeof css>;
  disabled?: boolean;
  underline?: boolean;
  opacity?: boolean;
}

export interface StyleTextButtonProps {
  $size: ButtonSize;
  $color: string;
  $css?: ReturnType<typeof css>;
  $underline: boolean;
  $opacity: boolean;
}

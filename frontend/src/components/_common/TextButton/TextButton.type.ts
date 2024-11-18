import { css } from 'styled-components';

type ButtonSize = 'base' | 'sm' | 'md' | 'lg' | 'xl' | string;
export type HoverType = 'LIGHT' | 'DARK';
export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: ButtonSize;
  color?: string;
  $css?: ReturnType<typeof css>;
  disabled?: boolean;
  underline?: boolean;
  hoverType?: HoverType;
}

export interface StyleTextButtonProps {
  $size: ButtonSize;
  $color: string;
  $css?: ReturnType<typeof css>;
  $underline: boolean;
  $hoverType: HoverType;
}

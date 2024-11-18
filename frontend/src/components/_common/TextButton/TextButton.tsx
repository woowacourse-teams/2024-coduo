import { TextButtonProps } from '@/components/_common/TextButton/TextButton.type';

import { theme } from '@/styles/theme';

import * as S from './TextButton.styles';

const TextButton = ({
  text,
  size = 'base',
  $css,
  color = theme.color.black[800],
  disabled = false,
  underline = false,
  hoverType = 'LIGHT',
  ...props
}: TextButtonProps) => {
  return (
    <S.Layout
      $css={$css}
      $size={size}
      $color={color}
      $underline={underline}
      $hoverType={hoverType}
      disabled={disabled}
      {...props}
    >
      {text}
    </S.Layout>
  );
};
export default TextButton;

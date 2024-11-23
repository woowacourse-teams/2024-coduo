import React from 'react';
import { IconType } from 'react-icons';

import { css } from 'styled-components';

import * as S from './IconButton.styles';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $css?: ReturnType<typeof css>;
  icon: React.ReactElement<React.JSXElementConstructor<IconType | SVGElement>>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

const IconButton = ({
  $css,
  icon,
  size = 'md',
  color = '#000000',
  backgroundColor = '#FFFFFF',
  disabled = false,
  ...props
}: IconButtonProps) => {
  return (
    <S.Layout $css={$css} $size={size} $color={color} $backgroundColor={backgroundColor} disabled={disabled} {...props}>
      {icon}
    </S.Layout>
  );
};

export default IconButton;

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
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  icon,
  size = 'sm',
  isActive = true,
  $css,
  onClick,
  color = '#000000',
  backgroundColor = '#FFFFFF',
  disabled = false,
  ...props
}: IconButtonProps) => {
  return (
    <S.Layout
      $css={$css}
      $size={size}
      $isActive={isActive}
      $color={color}
      $backgroundColor={backgroundColor}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      {...props}
    >
      {icon}
    </S.Layout>
  );
};

export default IconButton;

import { css } from 'styled-components';

import * as S from '@/components/common/Button/Button.styles';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'secondary';

interface ButtonProp {
  size?: ButtonSize;
  fontSize?: string;

  color?: ButtonColor;
  filled?: boolean;
  rounded?: boolean;

  disabled?: boolean;
  animation?: boolean;
  click: () => void;
  children?: React.ReactNode;
  css?: ReturnType<typeof css>;
}

const Button = ({
  size = 'lg',
  filled = true,
  rounded = false,
  disabled = false,
  click,

  children,
  animation = true,

  css,

  color = 'primary',
}: ButtonProp) => {
  const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
      case 'sm':
        return { width: '6rem', height: '3rem', fontSize: '1.2rem' };
      case 'md':
        return { width: '10rem', height: '4rem', fontSize: '1.4rem' };
      case 'lg':
        return { width: '15rem', height: '4rem', fontSize: '1.6rem' };
      case 'xl':
        return { width: '25rem', height: '6.5rem', fontSize: '1.8rem' };
    }
  };

  const buttonSize = getSizeStyles(size);

  return (
    <S.Button
      onClick={click}
      disabled={disabled}
      width={buttonSize.width}
      height={buttonSize.height}
      fontSize={buttonSize.fontSize}
      filled={filled}
      rounded={rounded}
      animation={animation}
      color={color}
      css={css}
    >
      {children}
    </S.Button>
  );
};

export default Button;

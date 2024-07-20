import { css } from 'styled-components';

import * as S from '@/components/common/Button/Button.styles';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
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

  children: React.ReactNode;
  css?: ReturnType<typeof css>;
}

const Button = ({
  size = 'lg',
  filled = true,
  rounded = false,
  disabled = false,
  animation = true,
  color = 'primary',
  click,
  children,
  css,
}: ButtonProp) => {
  return (
    <>
      <S.Button
        onClick={click}
        size={size}
        filled={filled}
        rounded={rounded}
        animation={animation}
        color={color}
        css={css}
        disabled={disabled}
      >
        {children}
      </S.Button>
    </>
  );
};

export default Button;

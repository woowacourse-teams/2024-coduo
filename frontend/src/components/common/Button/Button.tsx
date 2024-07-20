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
  const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
      case 'sm':
        return { width: '96px', height: '48px', fontSize: '19.2px' };
      case 'md':
        return { width: '160px', height: '64px', fontSize: '22.4px' };
      case 'lg':
        return { width: '240px', height: '64px', fontSize: '25.6px' };
      case 'xl':
        return { width: '400px', height: '104px', fontSize: '28.8px' };
    }
  };

  const buttonSize = getSizeStyles(size);

  return (
    <>
      {disabled ? (
        <S.DisabledButton
          width={buttonSize.width}
          height={buttonSize.height}
          fontSize={buttonSize.fontSize}
          filled={filled}
          rounded={rounded}
          css={css}
        >
          {children}
        </S.DisabledButton>
      ) : (
        <S.Button
          onClick={click}
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
      )}
    </>
  );
};

export default Button;

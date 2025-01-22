import * as S from './Header.styles';

interface HeaderProps {
  icon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  title: string;
  isOpen?: boolean;
  toggleIsOpen?: () => void;
  className?: string;
}

const Header = ({
  icon,
  secondIcon,
  title,
  children,
  isOpen = true,
  toggleIsOpen,
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout $isOpen={isOpen} onClick={toggleIsOpen} {...props}>
      <S.TitleContainer>
        {icon}
        <p>{title}</p>
        {secondIcon}
      </S.TitleContainer>
      {children}
    </S.Layout>
  );
};

export default Header;

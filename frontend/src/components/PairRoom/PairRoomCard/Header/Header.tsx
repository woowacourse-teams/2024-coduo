import * as S from './Header.styles';

interface HeaderProps {
  icon: React.ReactNode;
  title: string;
  isOpen?: boolean;
  toggleIsOpen?: () => void;
}

const Header = ({ icon, title, children, isOpen = true, toggleIsOpen }: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout $isOpen={isOpen} onClick={toggleIsOpen}>
      <S.TitleContainer>
        {icon}
        <p>{title}</p>
      </S.TitleContainer>
      {children}
    </S.Layout>
  );
};

export default Header;

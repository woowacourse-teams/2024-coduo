import * as S from './Header.styles';

interface HeaderProps {
  icon: React.ReactNode;
  title: string;
}

const Header = ({ icon, title, children }: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout>
      <S.TitleContainer>
        {icon}
        <p>{title}</p>
      </S.TitleContainer>
      {children}
    </S.Layout>
  );
};

export default Header;

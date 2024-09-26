import * as S from './Header.styles';

interface HeaderProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Header = ({ title, subTitle, children }: HeaderProps) => {
  return (
    <S.Layout>
      <S.Title>{title}</S.Title>
      {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
      {children}
    </S.Layout>
  );
};

export default Header;

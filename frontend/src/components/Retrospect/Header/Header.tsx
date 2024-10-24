import Button from '@/components/common/Button/Button';

import * as S from './Header.styles';

interface HeaderProps {
  title: string;
  subTitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Header = ({ title, subTitle, buttonText, onButtonClick }: HeaderProps) => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.SubTitle>{subTitle}</S.SubTitle>
      </S.TitleContainer>
      <Button $css={S.buttonStyles} filled={false} rounded={true} size="sm" color="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </S.Layout>
  );
};

export default Header;

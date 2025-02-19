import Button from '@/components/_common/Button/Button';

import * as S from './Header.styles';

interface HeaderProps {
  title: string;
  subTitle: string;
  buttonText: string;
  buttonDisabled: boolean;
  onButtonClick: () => void;
}

const Header = ({ title, subTitle, buttonText, buttonDisabled, onButtonClick }: HeaderProps) => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.SubTitle>{subTitle}</S.SubTitle>
      </S.TitleContainer>
      <Button
        width="11rem"
        color="secondary"
        filled={false}
        rounded={true}
        size="sm"
        disabled={buttonDisabled}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </S.Layout>
  );
};

export default Header;

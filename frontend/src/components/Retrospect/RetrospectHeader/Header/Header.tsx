import Button from '@/components/common/Button/Button';

import * as S from './Header.styles';

interface HeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Header = ({ title, buttonText, onButtonClick }: HeaderProps) => {
  return (
    <S.Layout>
      <S.Title>{title}</S.Title>
      <Button onClick={onButtonClick} filled={false} rounded={true} size="sm" color="primary" css={S.ButtonStyle}>
        {buttonText}
      </Button>
    </S.Layout>
  );
};

export default Header;

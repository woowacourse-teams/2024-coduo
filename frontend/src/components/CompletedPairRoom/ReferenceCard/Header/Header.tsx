import { IoIosLink } from 'react-icons/io';

import Button from '@/components/_common/Button/Button';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  selectedCategoryName: string;
  onButtonClick: () => void;
}

const Header = ({ selectedCategoryName, onButtonClick }: React.PropsWithChildren<HeaderProps>) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onButtonClick();
  };

  return (
    <S.Layout>
      <S.Container>
        <IoIosLink size={theme.fontSize.h6} color={theme.color.primary[700]} />
        <p>링크</p>
      </S.Container>
      <Button size="sm" width="fit-content" rounded={true} onClick={handleButtonClick}>
        {selectedCategoryName}
      </Button>
    </S.Layout>
  );
};

export default Header;

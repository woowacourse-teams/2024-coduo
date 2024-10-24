import { IoIosLink } from 'react-icons/io';

import Button from '@/components/common/Button/Button';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  selectedFilteringCategoryName: string;
  onButtonClick: () => void;
}

const Header = ({ selectedFilteringCategoryName, onButtonClick }: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout>
      <S.Container>
        <IoIosLink size={theme.fontSize.h6} color={theme.color.primary[600]} />
        <p>링크</p>
      </S.Container>
      <Button
        $css={S.buttonStyles}
        size="sm"
        rounded={true}
        onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          event.stopPropagation();
          onButtonClick();
        }}
      >
        {selectedFilteringCategoryName}
      </Button>
    </S.Layout>
  );
};

export default Header;

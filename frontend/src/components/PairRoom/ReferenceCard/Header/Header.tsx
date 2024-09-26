import { IoIosLink, IoIosArrowDown } from 'react-icons/io';

import Button from '@/components/common/Button/Button';
import ToolTipQuestionBox from '@/components/common/ToolTipQuestionBox/ToolTipQuestionBox';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  selectedFilteringCategoryName: string;
  toggleIsOpen: () => void;
  onButtonClick: () => void;
}

const Header = ({
  isOpen,
  selectedFilteringCategoryName,
  toggleIsOpen,
  onButtonClick,
}: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout onClick={toggleIsOpen}>
      <S.Container>
        {isOpen ? (
          <IoIosLink size={theme.fontSize.h6} color={theme.color.primary[600]} />
        ) : (
          <IoIosArrowDown size={theme.fontSize.h6} color={theme.color.primary[600]} />
        )}
        <p>링크</p>
        <ToolTipQuestionBox
          message="페어 프로그래밍을 진행하면서 도움이 되었던 레퍼런스 링크를 저장해 보세요."
          color={theme.color.black[50]}
          boxDirection="right"
        />
      </S.Container>
      <Button
        css={S.buttonStyles}
        size="sm"
        rounded={true}
        onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          event.stopPropagation();
          onButtonClick();
          toggleIsOpen();
        }}
      >
        {selectedFilteringCategoryName}
      </Button>
    </S.Layout>
  );
};

export default Header;

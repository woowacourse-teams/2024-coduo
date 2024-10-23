import { IoIosLink, IoIosArrowUp } from 'react-icons/io';

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
    <S.Layout
      aria-label={isOpen ? '링크 카드 열림' : '링크 카드 닫힘, 클릭하시면 링크 카드가 열립니다.'}
      onClick={toggleIsOpen}
    >
      <S.Container>
        {isOpen ? (
          <IoIosLink size={theme.fontSize.h6} color={theme.color.primary[600]} role="presentation" />
        ) : (
          <IoIosArrowUp size={theme.fontSize.h6} color={theme.color.primary[600]} role="presentation" />
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
        aria-label={`현재 카테고리는 ${selectedFilteringCategoryName} 입니다. 클릭하시면 카테고리 선택 모달이 열립니다.`}
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

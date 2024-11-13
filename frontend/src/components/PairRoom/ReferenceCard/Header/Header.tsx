import { IoIosLink, IoIosArrowUp } from 'react-icons/io';

import Button from '@/components/_common/Button/Button';
import ToolTipQuestionBox from '@/components/_common/ToolTipQuestionBox/ToolTipQuestionBox';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  selectedCategoryName: string;
  toggleIsOpen: () => void;
  onButtonClick: () => void;
}

const Header = ({
  isOpen,
  selectedCategoryName,
  toggleIsOpen,
  onButtonClick,
}: React.PropsWithChildren<HeaderProps>) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onButtonClick();
    toggleIsOpen();
  };

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
          color={theme.color.black[300]}
          boxDirection="right"
        />
      </S.Container>
      <Button
        size="sm"
        borderRadius="3rem"
        aria-label={`현재 카테고리는 ${selectedCategoryName} 입니다. 클릭하시면 카테고리 선택 모달이 열립니다.`}
        onClick={handleButtonClick}
      >
        {selectedCategoryName}
      </Button>
    </S.Layout>
  );
};

export default Header;

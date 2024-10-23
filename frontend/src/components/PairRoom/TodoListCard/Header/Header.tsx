import { IoIosCheckbox, IoIosArrowDown } from 'react-icons/io';

import ToolTipQuestionBox from '@/components/common/ToolTipQuestionBox/ToolTipQuestionBox';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const Header = ({ isOpen, toggleIsOpen }: React.PropsWithChildren<HeaderProps>) => {
  return (
    <S.Layout onClick={toggleIsOpen}>
      {isOpen ? (
        <IoIosCheckbox size={theme.fontSize.h6} color={theme.color.primary[600]} aria-label="투두 리스트 카드 열림" />
      ) : (
        <IoIosArrowDown
          size={theme.fontSize.h6}
          color={theme.color.primary[600]}
          aria-label="투두 리스트 카드 열기"
          aria-roledescription="button"
        />
      )}
      <p>투두 리스트</p>
      <ToolTipQuestionBox
        message="페어 프로그래밍을 위해 필요한 할 일 목록을 작성해 보세요. 할 일을 더욱 효율적으로 관리할 수 있습니다."
        color={theme.color.black[50]}
        boxDirection="right"
      />
    </S.Layout>
  );
};

export default Header;

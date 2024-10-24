import { IoPeople } from 'react-icons/io5';

import Button from '@/components/common/Button/Button';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Header = ({ isOpen, toggleOpen }: HeaderProps) => (
  <S.Layout
    icon={isOpen && <IoPeople color={theme.color.primary[500]} role="presentation" />}
    title={isOpen ? '페어' : ''}
  >
    <Button $css={S.expandButton} onClick={toggleOpen} aria-label={isOpen ? '목록 접기' : '목록 열기'}>
      <S.ArrowIcon $isOpen={isOpen} />
    </Button>
  </S.Layout>
);

export default Header;

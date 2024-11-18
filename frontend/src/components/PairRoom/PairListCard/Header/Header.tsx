import { IoPeople } from 'react-icons/io5';

import IconButton from '@/components/_common/IconButton/IconButton';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Header = ({ isOpen, toggleOpen }: HeaderProps) => (
  <S.Layout
    icon={isOpen && <IoPeople color={theme.color.primary[600]} role="presentation" />}
    title={isOpen ? '페어' : ''}
    $isOpen={isOpen}
  >
    <IconButton
      icon={<S.ArrowIcon $isOpen={isOpen} />}
      size="md"
      onClick={toggleOpen}
      aria-label={isOpen ? '목록 접기' : '목록 열기'}
    />
  </S.Layout>
);
export default Header;

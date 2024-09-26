import { IoPeople } from 'react-icons/io5';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Header = ({ isOpen, toggleOpen }: HeaderProps) => (
  <S.Layout icon={isOpen ? <IoPeople color={theme.color.primary[500]} /> : <></>} title={isOpen ? '페어' : ''}>
    <S.ArrowIcon $isOpen={isOpen} onClick={toggleOpen} />
  </S.Layout>
);

export default Header;

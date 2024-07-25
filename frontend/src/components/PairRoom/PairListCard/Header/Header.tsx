import { IoPeople } from 'react-icons/io5';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

interface HeaderProps {
  isOpen: boolean;
}

const Header = ({ isOpen }: HeaderProps) => (
  <S.Layout icon={isOpen ? <IoPeople color={theme.color.primary[500]} /> : <></>} title={isOpen ? '페어' : ''}>
    <S.ArrowIcon $isOpen={isOpen} />
  </S.Layout>
);

export default Header;

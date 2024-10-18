import { IoIosCheckbox } from 'react-icons/io';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

const Header = () => {
  return (
    <S.Layout>
      <IoIosCheckbox size={theme.fontSize.h6} color={theme.color.primary[600]} />
      <p>투두 리스트</p>
    </S.Layout>
  );
};

export default Header;

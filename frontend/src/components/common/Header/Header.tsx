import { Link } from 'react-router-dom';

import { HiQuestionMarkCircle } from 'react-icons/hi';
import { LuHome } from 'react-icons/lu';

import { LogoIcon } from '@/assets';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';


const Header = () => {
  return (
    <S.Layout>
      <Link to="/">
        <S.Logo src={LogoIcon} alt="logo_icon_with_title" />
      </Link>
      <S.LinkContainer>
        <S.HowToPairLinkContainer>
          <Link to="/how-to-pair">
            <S.HowToPairTextLink>페어 프로그래밍이란?</S.HowToPairTextLink>
          </Link>
          <Link to="/how-to-pair">
            <S.HowToPairIconLink>
              <HiQuestionMarkCircle size={theme.iconSize.sm} />
            </S.HowToPairIconLink>
          </Link>
        </S.HowToPairLinkContainer>
        <Link to="/">
          <S.HomeLink>
            <LuHome size={theme.iconSize.sm} />
          </S.HomeLink>
        </Link>
      </S.LinkContainer>
    </S.Layout>
  );
};

export default Header;

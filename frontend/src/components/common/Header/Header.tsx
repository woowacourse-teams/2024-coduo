import { HiQuestionMarkCircle } from 'react-icons/hi';
import { LuHome } from 'react-icons/lu';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

import { LogoIcon } from '@/assets';

// TODO: 링크에 따라 href 값 수정 필요
const Header = () => {
  return (
    <S.Layout>
      <a href="/">
        <S.Logo src={LogoIcon} alt="logo_icon_with_title" />
      </a>
      <S.AnchorContainer>
        <S.HowToPairAnchorContainer>
          <S.HowToPairTextAnchor href="/how-to-pair">페어 프로그래밍이란?</S.HowToPairTextAnchor>
          <S.HowToPairIconAnchor href="/how-to-pair">
            <HiQuestionMarkCircle size={theme.iconSize.sm} />
          </S.HowToPairIconAnchor>
        </S.HowToPairAnchorContainer>
        <S.HomeAnchor href="/">
          <LuHome size={theme.iconSize.sm} />
        </S.HomeAnchor>
      </S.AnchorContainer>
    </S.Layout>
  );
};

export default Header;

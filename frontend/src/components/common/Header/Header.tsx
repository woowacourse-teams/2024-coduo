import { HiQuestionMarkCircle } from 'react-icons/hi';
import { LuHome } from 'react-icons/lu';

import { LogoIconWithTitle } from '@/assets';

import * as S from './Header.style';

// TODO: 링크에 따라 href 값 수정 필요
const Header = () => {
  return (
    <S.Layout>
      <S.LogoWrapper href="/">
        <S.Logo src={LogoIconWithTitle} alt="logo_icon_with_title" />
      </S.LogoWrapper>
      <S.AnchorContainer>
        <S.HowToPairAnchorContainer>
          <S.HowToPairTextAnchor href="/how-to-pair">페어 프로그래밍이란?</S.HowToPairTextAnchor>
          <S.HowToPairIconAnchor href="/how-to-pair">
            <HiQuestionMarkCircle style={{ width: '2.5rem', height: '2.5rem' }} />
          </S.HowToPairIconAnchor>
        </S.HowToPairAnchorContainer>
        <S.HomeAnchor href="/">
          <LuHome style={{ width: '2.5rem', height: '2.5rem' }} />
        </S.HomeAnchor>
      </S.AnchorContainer>
    </S.Layout>
  );
};

export default Header;

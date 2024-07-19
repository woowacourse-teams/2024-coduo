import { HiQuestionMarkCircle } from 'react-icons/hi';
import { LuHome } from 'react-icons/lu';

import { logo_icon_with_title } from '@/assets';

import * as S from './Header.style';

const Header = () => {
  return (
    <S.Container>
      <S.LogoWrapper>
        <S.Logo src={logo_icon_with_title} alt="logo_icon_with_title" />
      </S.LogoWrapper>
      <S.ButtonWrapper>
        <S.HowToPairButtonWrapper>
          <S.HowToPairTextButton>페어 프로그래밍이란?</S.HowToPairTextButton>
          <S.HowToPairIconButton>
            <HiQuestionMarkCircle style={{ width: '2.5rem', height: '2.5rem' }} />
          </S.HowToPairIconButton>
        </S.HowToPairButtonWrapper>
        <S.HomeButton>
          <LuHome style={{ width: '2.5rem', height: '2.5rem' }} />
        </S.HomeButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default Header;

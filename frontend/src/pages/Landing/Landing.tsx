import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GithubLogoWhite, LogoIconWithTitle } from '@/assets';

import * as S from '@/pages/Landing/Landing.styles';

import Button from '@/components/_common/Button/Button';
import { ScrollAnimationContainer } from '@/components/_common/ScrollAnimationContainer/ScrollAnimationContainer';
import ScrollIcon, { TargetSection } from '@/components/_common/ScrollIcon/ScrollIcon';
import HowToPair from '@/components/Landing/HowToPair/HowToPair';

import useUserStore from '@/stores/userStore';

import usePreventBackNavigation from '@/hooks/_common/customEvent/usePreventBackNavigation';
import useSignInHandler from '@/hooks/_common/member/useSignInHandler';
import useScrollToTop from '@/hooks/_common/useScrollToTop';
import useTitleTime from '@/hooks/PairRoom/useTitleTime';

const targetSections: TargetSection[] = [
  { id: 'landing', position: 'top' },
  { id: 'how-to-pair', position: 'bottom' },
];

const Landing = () => {
  const navigate = useNavigate();
  const { userStatus } = useUserStore();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') navigate('/main');
  }, [userStatus]);

  const { handleSignInGithub } = useSignInHandler();

  useTitleTime();
  useScrollToTop();
  usePreventBackNavigation();

  return (
    <>
      <S.Layout id="landing">
        <ScrollAnimationContainer animationDirection="right">
          <S.SubTitle>당신의 첫 번째 페어 프로그래밍,</S.SubTitle>
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="right" animationDelay={0.75}>
          <S.Logo src={LogoIconWithTitle} alt="코딩해듀오 로고" />
        </ScrollAnimationContainer>
        <S.ButtonContainer>
          <ScrollAnimationContainer animationDirection="top" animationDelay={2}>
            <Button size="xl" width="26rem" color="#000000" onClick={handleSignInGithub}>
              <S.GithubLogo src={GithubLogoWhite} alt="" />
              Github로 로그인
            </Button>
          </ScrollAnimationContainer>
          <ScrollAnimationContainer animationDirection="top" animationDelay={2.1}>
            <Button size="xl" width="26rem" color="primary" onClick={() => navigate('/main')}>
              회원가입 없이 사용하기
            </Button>
          </ScrollAnimationContainer>
        </S.ButtonContainer>
      </S.Layout>
      <HowToPair />
      <ScrollIcon targetSections={targetSections} />
    </>
  );
};

export default Landing;

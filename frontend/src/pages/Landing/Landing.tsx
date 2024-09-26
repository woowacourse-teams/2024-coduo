import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GithubLogoWhite, LogoIconWithTitle } from '@/assets';

import HowToPair from '@/pages/HowToPair/HowToPair';
import * as S from '@/pages/Landing/Landing.styles';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';
import Button from '@/components/common/Button/Button';

import useUserStore from '@/stores/userStore';

import usePreventBackNavigation from '@/hooks/common/usePreventBackNavigation';
import useSignInHandler from '@/hooks/member/useSignInHandler';
import useTitleTime from '@/hooks/title/useTitleTime';

const Landing = () => {
  const navigate = useNavigate();

  useTitleTime();
  usePreventBackNavigation();

  const { userStatus } = useUserStore();
  const { handleSignInGithub } = useSignInHandler();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') navigate('/main');
  }, [userStatus]);

  return (
    <>
      <S.Layout>
        <ScrollAnimationContainer animationDirection="right">
          <S.SubTitle>당신의 첫 번째 페어 프로그래밍,</S.SubTitle>
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="right" animationDelay={0.75}>
          <S.Logo src={LogoIconWithTitle} alt="메인 로고" />
        </ScrollAnimationContainer>
        <S.ButtonContainer>
          <ScrollAnimationContainer animationDirection="top" animationDelay={2}>
            <Button css={S.githubButtonStyles} size="xl" filled={false} onClick={handleSignInGithub}>
              <img src={GithubLogoWhite} alt="" />
              Github로 로그인
            </Button>
          </ScrollAnimationContainer>
          <ScrollAnimationContainer animationDirection="top" animationDelay={2.1}>
            <Button size="xl" css={S.buttonStyles} filled={false} onClick={() => navigate('/main')}>
              회원가입 없이 사용하기
            </Button>
          </ScrollAnimationContainer>
        </S.ButtonContainer>
      </S.Layout>
      <HowToPair />
    </>
  );
};

export default Landing;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GithubLogoWhite, LogoIconWithTitle } from '@/assets';

import * as S from '@/pages/Landing/Landing.styles';

import { ScrollAnimationContainer } from '@/components/common/Animation/ScrollAnimationContainer';
import Button from '@/components/common/Button/Button';

import useUserStatusStore from '@/stores/userStatusStore';

import usePreventBackNavigation from '@/hooks/common/usePreventBackNavigation';
import useTitleTime from '@/hooks/common/useTitleTime';
import useSignInHandler from '@/hooks/member/useSignInHandler';

const Landing = () => {
  const { userStatus } = useUserStatusStore();
  const { handleSignInGithub } = useSignInHandler();
  const navigate = useNavigate();
  useTitleTime();

  usePreventBackNavigation();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') {
      navigate('/main');
    }
  }, [userStatus]);

  return (
    <S.Layout>
      <ScrollAnimationContainer animationDirection="right">
        <S.SubTitle>당신의 첫 번째 페어 프로그래밍,</S.SubTitle>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer animationDirection="right" animationDelay={0.75}>
        <S.Logo src={LogoIconWithTitle} alt="logo" />
      </ScrollAnimationContainer>

      <S.ButtonContainer>
        <ScrollAnimationContainer animationDirection="top" animationDelay={2}>
          <Button css={S.GithubLoginButton} size="xl" filled={false} onClick={handleSignInGithub}>
            <img src={GithubLogoWhite} alt="github logo" />
            Github로 로그인
          </Button>
        </ScrollAnimationContainer>
        <ScrollAnimationContainer animationDirection="top" animationDelay={2.1}>
          <Button size="xl" filled={false} onClick={() => navigate('/main')}>
            회원가입 없이 사용하기
          </Button>
        </ScrollAnimationContainer>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default Landing;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GithubLogoWhite } from '@/assets';

import * as S from '@/pages/Landing/Landing.styles';

import Button from '@/components/common/Button/Button';

import useUserStatusStore from '@/stores/userStatusStore';

import useSignInHandler from '@/hooks/member/useSignInHandler';

const Landing = () => {
  const { userStatus } = useUserStatusStore();
  const { handleSignInGithub } = useSignInHandler();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') {
      navigate('/main');
    }
  }, [userStatus]);

  return (
    <S.Layout>
      <S.TextContainer>
        <S.TitleContainer>
          <S.SubTitle>
            <span>협업</span>과 <span>성장</span>을 위한
            <br />
            <span>페어프로그래밍-</span>
          </S.SubTitle>
          <S.Title>
            코딩해<span>듀오</span>
          </S.Title>
        </S.TitleContainer>
        <S.Info>
          코딩해듀오는 페어프로그래밍을 통해 더 나은 결과를 만들어내는 것을 목표로 합니다.
          <br />
          직관적인 인터페이스와 실시간 협업 도구로, 누구나 쉽게 사용할 수 있습니다.
        </S.Info>
      </S.TextContainer>
      <S.ButtonContainer>
        {userStatus === 'SIGNED_OUT' && (
          <>
            <Button css={S.GithubLoginButton} size="xl" filled={false} rounded={true} onClick={handleSignInGithub}>
              <img src={GithubLogoWhite} alt="github logo" />
              Github로 로그인
            </Button>
            <Button size="xl" rounded={true} onClick={() => navigate('/main')}>
              회원가입 없이 사용하기
            </Button>
          </>
        )}
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default Landing;

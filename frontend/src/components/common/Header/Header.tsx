import { Link } from 'react-router-dom';

import { FaBook } from 'react-icons/fa';

import { LogoIcon } from '@/assets';

import useUserStore from '@/stores/userStore';

import useSignInHandler from '@/hooks/member/useSignInHandler';
import useSignOutHandler from '@/hooks/member/useSignOutHandler';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

const Header = () => {
  const { username, userStatus } = useUserStore();

  const { handleSignInGithub } = useSignInHandler();
  const { handleSignOut } = useSignOutHandler();

  return (
    <S.Layout>
      <Link to="/" aria-label="메인 페이지로 이동">
        <S.Logo src={LogoIcon} alt="" />
      </Link>
      <S.LinkContainer>
        <S.ResponsiveLink to="/coduo-docs" aria-label="코딩해듀오 시작하기로 이동">
          <span aria-hidden="true">코딩해듀오 시작하기</span>
        </S.ResponsiveLink>
        <S.ResponsiveIcon>
          <Link to="/coduo-docs" aria-label="코딩해듀오 시작하기로 이동">
            <FaBook size={theme.iconSize.sm} aria-hidden="true" />
          </Link>
        </S.ResponsiveIcon>
        {userStatus === 'SIGNED_IN' ? (
          <>
            <button onClick={handleSignOut}>로그아웃</button>
            <Link to="/my-page" aria-label={`${username}의 마이페이지로 이동`}>
              <span aria-hidden="true">{username}</span>
            </Link>
          </>
        ) : (
          <button onClick={handleSignInGithub}>Github로 로그인</button>
        )}
      </S.LinkContainer>
    </S.Layout>
  );
};

export default Header;

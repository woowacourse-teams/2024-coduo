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
      <Link to="/" tabIndex={0}>
        <S.Logo src={LogoIcon} alt="logo_icon_with_title" />
      </Link>
      <S.LinkContainer>
        <Link to="/coduo-docs" tabIndex={0}>
          코딩해듀오 시작하기
        </Link>
        <S.HowToPairIcon>
          <Link to="/coduo-docs" tabIndex={0}>
            <FaBook size={theme.iconSize.sm} />
          </Link>
        </S.HowToPairIcon>
        {userStatus === 'SIGNED_IN' ? (
          <>
            <button onClick={handleSignOut}>로그아웃</button>
            <Link to="/my-page" tabIndex={0}>
              {username}
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

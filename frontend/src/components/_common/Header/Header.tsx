import { Link } from 'react-router-dom';

import { FaBook } from 'react-icons/fa';

import { LogoIcon } from '@/assets';

import IconButton from '@/components/_common/IconButton/IconButton';
import TextButton from '@/components/_common/TextButton/TextButton';

import useUserStore from '@/stores/userStore';

import useSignInHandler from '@/hooks/_common/member/useSignInHandler';
import useSignOutHandler from '@/hooks/_common/member/useSignOutHandler';

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
          <TextButton text="코딩해듀오 시작하기" opacity={true} />
        </S.ResponsiveLink>
        <S.ResponsiveIcon>
          <Link to="/coduo-docs" aria-label="코딩해듀오 시작하기로 이동">
            <IconButton icon={<FaBook size={theme.iconSize.sm} aria-hidden="true" />} size="sm" />
          </Link>
        </S.ResponsiveIcon>
        {userStatus === 'SIGNED_IN' ? (
          <>
            <TextButton text="로그아웃" onClick={handleSignOut} opacity={true} />
            <Link to="/my-page" aria-label={`${username}의 마이페이지로 이동`}>
              <span aria-hidden="true">{username}</span>
            </Link>
          </>
        ) : (
          <TextButton text="Github로 로그인" onClick={handleSignInGithub} opacity={true} />
        )}
      </S.LinkContainer>
    </S.Layout>
  );
};

export default Header;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HiQuestionMarkCircle } from 'react-icons/hi';

import { LogoIcon } from '@/assets';

import useUserStatusStore from '@/stores/userStatusStore';

import { getMember } from '@/apis/member';

import useSignInHandler from '@/hooks/member/useSignInHandler';
import useSignOutHandler from '@/hooks/member/useSignOutHandler';

import { theme } from '@/styles/theme';

import * as S from './Header.styles';

const Header = () => {
  const [username, setUsername] = useState('');

  const { userStatus } = useUserStatusStore();
  const { handleSignInGithub } = useSignInHandler();
  const { handleSignOut } = useSignOutHandler();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') {
      getMember()
        .then((data) => setUsername(data.username))
        .catch(console.error);
    }
  }, [userStatus]);

  return (
    <S.Layout>
      <Link to="/">
        <S.Logo src={LogoIcon} alt="logo_icon_with_title" />
      </Link>
      <S.LinkContainer>
        <S.HowToPairLinkContainer>
          <Link to="/how-to-pair">
            <S.HowToPairTextLink>페어 프로그래밍이란?</S.HowToPairTextLink>
          </Link>
          <Link to="/how-to-pair">
            <S.HowToPairIconLink>
              <HiQuestionMarkCircle size={theme.iconSize.sm} />
            </S.HowToPairIconLink>
          </Link>
        </S.HowToPairLinkContainer>
        {userStatus === 'SIGNED_IN' ? (
          <>
            <S.LoginText onClick={handleSignOut}>로그아웃</S.LoginText>
            <S.Username>{username}</S.Username>
          </>
        ) : (
          <S.LoginText onClick={handleSignInGithub}>Github로 로그인</S.LoginText>
        )}
      </S.LinkContainer>
    </S.Layout>
  );
};

export default Header;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillQuestionCircle } from 'react-icons/ai';

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
        <Link to="/how-to-pair">
          <S.HowToPairText>페어 프로그래밍이란?</S.HowToPairText>
        </Link>
        <Link to="/how-to-pair">
          <S.HowToPairIcon>
            <AiFillQuestionCircle size={theme.iconSize.sm} />
          </S.HowToPairIcon>
        </Link>
        {userStatus === 'SIGNED_IN' ? (
          <>
            <button onClick={handleSignOut}>로그아웃</button>
            <p>{username}</p>
          </>
        ) : (
          <button onClick={handleSignInGithub}>Github로 로그인</button>
        )}
      </S.LinkContainer>
    </S.Layout>
  );
};

export default Header;

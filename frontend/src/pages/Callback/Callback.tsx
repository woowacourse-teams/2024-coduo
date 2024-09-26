import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIconWithTitle } from '@/assets';

import Spinner from '@/components/common/Spinner/Spinner';

import useUserStore from '@/stores/userStore';

import { getMember } from '@/apis/member';
import { getSignInCallback } from '@/apis/oauth';

import * as S from './Callback.styles';

const Callback = () => {
  const navigate = useNavigate();

  const hasCalledBack = useRef(false);

  const { setUser } = useUserStore();

  const handleCallBack = async () => {
    if (hasCalledBack.current) return;

    hasCalledBack.current = true;

    const { signedUp } = await getSignInCallback();

    if (signedUp) {
      const { username } = await getMember();

      setUser(username, 'SIGNED_IN');
      navigate('/main');
      return;
    }

    navigate('/sign-up');
  };

  useEffect(() => {
    handleCallBack();
  }, []);

  return (
    <S.Layout>
      <S.LogoIconWithTitle src={LogoIconWithTitle} alt="logo" />
      <S.Title>로그인 중입니다! 잠시만 기다려주세요 ☺️</S.Title>
      <Spinner size="md" />
    </S.Layout>
  );
};

export default Callback;

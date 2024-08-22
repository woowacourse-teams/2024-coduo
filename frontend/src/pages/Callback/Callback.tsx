import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIconWithTitle } from '@/assets';

import Spinner from '@/components/common/Spinner/Spinner';

import useUserStatusStore from '@/stores/userStatusStore';

import { getSignInCallback } from '@/apis/oauth';

import * as S from './Callback.styles';

const Callback = () => {
  const navigate = useNavigate();
  const hasCalledBack = useRef(false);
  const { setUserStatus } = useUserStatusStore();
  const handleCallBack = async () => {
    if (hasCalledBack.current) return;
    hasCalledBack.current = true;

    const response = await getSignInCallback();
    if (response.signedUp) {
      setUserStatus('SIGNED_IN');
      navigate('/main');
    } else {
      navigate('/sign-up');
    }
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

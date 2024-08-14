import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/common/Spinner/Spinner';

import { getSignInCallback } from '@/apis/oauth';

import * as S from './Callback.styles';

const Callback = () => {
  const navigate = useNavigate();
  const hasCalledBack = useRef(false);

  const handleCallBack = async () => {
    if (hasCalledBack.current) return;
    hasCalledBack.current = true;

    const response = await getSignInCallback();
    if (response.signedUp) {
      navigate('/');
    } else {
      navigate('/sign-up');
    }
  };

  useEffect(() => {
    handleCallBack();
  }, []);

  return (
    <S.Layout>
      <S.LoginText>로그인 중입니다! 잠시만 기다려주세요 ☺️</S.LoginText>
      <Spinner size="lg" />
    </S.Layout>
  );
};

export default Callback;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIconWithTitle } from '@/assets';

import Spinner from '@/components/common/Spinner/Spinner';

// import useUserStore from '@/stores/userStore';

// import { getMember } from '@/apis/member';
import { getSignInCallback } from '@/apis/oauth';

import * as S from './Callback.styles';

const Callback = () => {
  const navigate = useNavigate();

  // const { setUser } = useUserStore();

  useEffect(() => {
    const handleCallBack = async () => {
      console.log('1');

      const { signedUp } = await getSignInCallback();

      console.log('2');

      if (signedUp) {
        // const { username } = await getMember();

        // setUser(username, 'SIGNED_IN');

        console.log('3');

        navigate('/main');

        console.log('4');

        return;
      }

      console.log('5');

      navigate('/sign-up');
    };

    handleCallBack();
  }, []);

  return (
    <S.Layout>
      <S.LogoIcon src={LogoIconWithTitle} alt="logo" />
      <S.Title>로그인 중입니다. 잠시만 기다려주세요 😊</S.Title>
      <Spinner size="md" />
    </S.Layout>
  );
};

export default Callback;

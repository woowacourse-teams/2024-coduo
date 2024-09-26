import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIconWithTitle } from '@/assets';

import { validateName } from '@/validations/validatePairName';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

import useUserStore from '@/stores/userStore';

import useInput from '@/hooks/common/useInput';
import useSignUpHandler from '@/hooks/member/useSignUpHandler';

import * as S from './SignUp.styles';

const SignUp = () => {
  const navigate = useNavigate();

  const { userStatus } = useUserStore();

  useEffect(() => {
    if (userStatus === 'SIGNED_IN') navigate('/main', { replace: true });
  }, [userStatus]);

  const {
    value: username,
    status: usernameStatus,
    message: usernameMessage,
    handleChange: onUsernameChange,
  } = useInput();

  const { handleSignUp } = useSignUpHandler();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(event, validateName(event.target.value));
  };

  return (
    <S.Layout>
      <S.LogoIconWithTitle src={LogoIconWithTitle} alt="logo_icon_with_title" />
      <S.Title>첫 방문이시네요! 당신을 어떻게 불러야 할까요?</S.Title>
      <S.InputWrapper>
        <Input
          value={username}
          status={usernameStatus}
          message={usernameMessage}
          title="이름(또는 닉네임)"
          placeholder="이름(또는 닉네임)을 입력해주세요."
          onChange={handleChange}
        />
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button size="lg" rounded={true} onClick={() => handleSignUp(username)}>
          계정 만들기 🥳
        </Button>
      </S.ButtonWrapper>
    </S.Layout>
  );
};

export default SignUp;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignUp(username);
  };

  return (
    <S.Layout>
      <S.LogoIconWithTitle src={LogoIconWithTitle} alt="logo_icon_with_title" />
      <S.Form onSubmit={handleSubmit}>
        <S.Title>첫 방문이시네요! 당신을 어떻게 불러야 할까요?</S.Title>
        <Input
          value={username}
          status={usernameStatus}
          message={usernameMessage}
          width="50rem"
          title="이름(또는 닉네임)"
          placeholder="이름(또는 닉네임)을 입력해주세요."
          onChange={handleChange}
        />
        <Button css={S.buttonStyles} type="submit" size="lg" disabled={validateName(username).status === 'ERROR'}>
          계정 만들기 🥳
        </Button>
      </S.Form>
    </S.Layout>
  );
};

export default SignUp;

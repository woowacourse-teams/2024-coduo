import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIconWithTitle } from '@/assets';

import Button from '@/components/_common/Button/Button';
import { InputField } from '@/components/_common/InputField';

import useUserStore from '@/stores/userStore';

import useSignUpHandler from '@/hooks/_common/member/useSignUpHandler';
import useInput from '@/hooks/_common/useInput';

import { validateName } from '@/validations/validatePairName';

import { theme } from '@/styles/theme';

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
        <InputField>
          <InputField.Input
            value={username}
            status={usernameStatus}
            width="50rem"
            title="이름(또는 닉네임)"
            placeholder="이름(또는 닉네임)을 입력해주세요."
            onChange={handleChange}
          />
          <InputField.Message status={usernameStatus}>{usernameMessage}</InputField.Message>
        </InputField>
        <Button
          width="50rem"
          fontSize={theme.fontSize.md}
          type="submit"
          size="lg"
          disabled={validateName(username).status === 'ERROR'}
        >
          계정 만들기 🥳
        </Button>
      </S.Form>
    </S.Layout>
  );
};

export default SignUp;

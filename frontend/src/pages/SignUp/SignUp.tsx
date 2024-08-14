import { LogoIconWithTitle } from '@/assets';
import validatePairName from '@/validations/common/validatePairName';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

import useInput from '@/hooks/common/useInput';

import useSignUp from '@/queries/Member/Github/useSignUp';

import * as S from './SignUp.styles';

const SignUp = () => {
  const {
    value: username,
    status: usernameStatus,
    message: usernameMessage,
    handleChange: onUsernameChange,
  } = useInput();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(event, validatePairName(event.target.value));
  };

  const { mutate } = useSignUp(username);

  const handleSignUp = () => {
    mutate();
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
        <Button size="lg" rounded={true} onClick={handleSignUp}>
          계정 만들기 🥳
        </Button>
      </S.ButtonWrapper>
    </S.Layout>
  );
};

export default SignUp;

import { useState } from 'react';

import { LogoIcon } from '@/assets';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { InputType } from '@/components/common/Input/Input.type';

import * as S from './PairNameInput.styles';

interface PairNameInputProps {
  userPairName: InputType;
  pairName: InputType;
  onUserPairName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPairName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddPairModal: () => void;
}

const PairNameInput = ({
  userPairName,
  pairName,
  onUserPairName,
  onPairName,
  openAddPairModal,
}: PairNameInputProps) => {
  const [isInputOpen, setIsInputOpen] = useState(false);

  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>이름 입력</S.Title>
        <S.SubTitle>나와 페어의 이름을 입력해 주세요.</S.SubTitle>
      </S.TitleContainer>
      <S.InputContainer>
        <S.Label>나의 이름은 무엇인가요?</S.Label>
        <Input
          placeholder="이름을 입력해주세요"
          value={userPairName.value}
          status={userPairName.status}
          message={userPairName.message}
          onChange={onUserPairName}
        />
      </S.InputContainer>
      <S.InputContainer>
        <S.Label>함께할 페어의 이름은 무엇인가요?</S.Label>
        {isInputOpen ? (
          <S.InputWrapper>
            <Input
              placeholder="이름을 입력해주세요"
              value={pairName.value}
              status={pairName.status}
              message={pairName.message}
              onChange={onPairName}
            />
            <Button css={S.buttonStyles} onClick={() => setIsInputOpen(false)}>
              취소
            </Button>
          </S.InputWrapper>
        ) : (
          <>
            <S.AddButton onClick={openAddPairModal}>
              <div>
                <img src={LogoIcon} alt="" />
              </div>
              <p>페어 정보 연동하기</p>
            </S.AddButton>
            <S.TextButton onClick={() => setIsInputOpen(true)}>연동 없이 시작하기</S.TextButton>
          </>
        )}
      </S.InputContainer>
    </S.Layout>
  );
};

export default PairNameInput;

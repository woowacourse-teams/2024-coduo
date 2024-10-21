import { useState } from 'react';

import { LogoIcon } from '@/assets';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { InputType } from '@/components/common/Input/Input.type';
import AddPairModal from '@/components/PairRoomOnboarding/AddPairModal/AddPairModal';

import useModal from '@/hooks/common/useModal';

import * as S from './PairNameInput.styles';

interface PairNameInputProps {
  firstPairName: InputType;
  secondPairName: InputType;
  onFirstPair: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondPair: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PairNameInput = ({ firstPairName, secondPairName, onFirstPair, onSecondPair }: PairNameInputProps) => {
  const [isPairInputOpen, setIsPairInputOpen] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>이름 입력</S.Title>
        <S.SubTitle>나와 페어의 이름을 입력해 주세요.</S.SubTitle>
      </S.TitleContainer>
      <S.InputContainer>
        <S.Label>나의 이름은 무엇인가요?</S.Label>
        <S.InputWrapper>
          <Input
            placeholder="이름을 입력해주세요"
            value={firstPairName.value}
            status={firstPairName.status}
            message={firstPairName.message}
            onChange={onFirstPair}
          />
        </S.InputWrapper>
      </S.InputContainer>
      <S.InputContainer>
        <S.Label>함께할 페어의 이름은 무엇인가요?</S.Label>
        {isPairInputOpen ? (
          <S.InputWrapper>
            <Input
              placeholder="이름을 입력해주세요"
              value={secondPairName.value}
              status={secondPairName.status}
              message={secondPairName.message}
              onChange={onSecondPair}
            />
            <Button css={S.buttonStyles} onClick={() => setIsPairInputOpen(false)}>
              취소
            </Button>
          </S.InputWrapper>
        ) : (
          <>
            <S.AddButton onClick={openModal}>
              <S.Logo>
                <img src={LogoIcon} alt="" />
              </S.Logo>
              <S.AddText>페어 정보 연동하기</S.AddText>
            </S.AddButton>
            <S.TextButton onClick={() => setIsPairInputOpen(true)}>연동 없이 시작하기</S.TextButton>
          </>
        )}
      </S.InputContainer>
      <AddPairModal isOpen={isModalOpen} close={closeModal} />
    </S.Layout>
  );
};

export default PairNameInput;

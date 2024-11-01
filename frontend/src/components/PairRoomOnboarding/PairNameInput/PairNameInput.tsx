/* eslint-disable jsx-a11y/no-autofocus */
import { useState, useEffect } from 'react';

import { LogoIcon } from '@/assets';

import Button from '@/components/_common/Button/Button';
import { InputGroup } from '@/components/_common/InputGroup';
import { InputType } from '@/components/_common/InputGroup/Input.type';

import { theme } from '@/styles/theme';

import * as S from './PairNameInput.styles';

interface PairNameInputProps {
  userPairName: InputType;
  pairId: string;
  pairName: InputType;
  onUserPairName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPairName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddPairModal: () => void;
}

const PairNameInput = ({
  userPairName,
  pairId,
  pairName,
  onUserPairName,
  onPairName,
  openAddPairModal,
}: PairNameInputProps) => {
  const [isInputOpen, setIsInputOpen] = useState(!!pairId);

  useEffect(() => {
    if (pairId !== '') setIsInputOpen(true);
  }, [pairId]);

  return (
    <S.Layout aria-label="총 3개의 설정 항목 중 1번째 항목입니다.">
      <S.TitleContainer>
        <S.Title>이름 입력</S.Title>
        <S.SubTitle>나와 페어의 이름을 입력해 주세요.</S.SubTitle>
      </S.TitleContainer>

      <InputGroup>
        <InputGroup.Label htmlFor="my-name" color={theme.color.primary[800]}>
          나의 이름은 무엇인가요?
        </InputGroup.Label>
        <InputGroup.Input
          id="my-name"
          placeholder="이름을 입력해주세요"
          value={userPairName.value}
          status={userPairName.status}
          onChange={onUserPairName}
        />
        <InputGroup.Message status={userPairName.status}>{userPairName.message}</InputGroup.Message>
      </InputGroup>

      <InputGroup>
        <InputGroup.Label htmlFor="pair-name">함께할 페어의 이름은 무엇인가요?</InputGroup.Label>
        {isInputOpen ? (
          <>
            <InputGroup.Content>
              <InputGroup.Input
                id="pair-name"
                autoFocus
                placeholder="이름을 입력해주세요"
                value={pairName.value}
                status={pairName.status}
                onChange={onPairName}
              />
              {!pairId && (
                <Button width="8rem" color="black" fontSize={theme.fontSize.md} onClick={() => setIsInputOpen(false)}>
                  취소
                </Button>
              )}
            </InputGroup.Content>

            <InputGroup.Message status={pairName.status}>{pairName.message}</InputGroup.Message>
          </>
        ) : (
          <>
            {/* TODO: 아이콘버튼 */}
            <S.AddButton
              aria-label="페어 정보 연동하기 버튼, 클릭하시면 페어 정보 연동 모달이 열립니다."
              onClick={openAddPairModal}
            >
              <div aria-hidden="true">
                <img src={LogoIcon} alt="" />
              </div>
              <p>페어 정보 연동하기</p>
            </S.AddButton>
            <S.TextButton onClick={() => setIsInputOpen(true)}>연동 없이 시작하기</S.TextButton>
          </>
        )}
      </InputGroup>
    </S.Layout>
  );
};

export default PairNameInput;

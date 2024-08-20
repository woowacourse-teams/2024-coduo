import Input from '@/components/common/Input/Input';

import { InputType } from '@/hooks/common/useInput';

import * as S from './PairNameInput.styles';

interface PairNameInputProps {
  firstPairName: InputType;
  secondPairName: InputType;
  onFirstPair: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondPair: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PairNameInput = ({ firstPairName, secondPairName, onFirstPair, onSecondPair }: PairNameInputProps) => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>이름 입력</S.Title>
        <S.SubTitle>나와 페어의 이름을 입력해 주세요.</S.SubTitle>
      </S.TitleContainer>
      <S.InputContainer>
        <Input
          placeholder="이름을 입력해주세요"
          label="나의 이름은 무엇인가요?"
          value={firstPairName.value}
          status={firstPairName.status}
          message={firstPairName.message}
          onChange={onFirstPair}
        />
      </S.InputContainer>
      <S.InputContainer>
        <Input
          placeholder="이름을 입력해주세요"
          label="함께할 페어의 이름은 무엇인가요?"
          value={secondPairName.value}
          status={secondPairName.status}
          message={secondPairName.message}
          onChange={onSecondPair}
        />
      </S.InputContainer>
    </S.Layout>
  );
};

export default PairNameInput;

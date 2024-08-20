import Input from '@/components/common/Input/Input';

import usePairNameInputs from '@/hooks/Main/usePairNameInputs';

import * as S from './PairNameInput.styles';

interface PairNameInputProps {
  onFirstPair: (firstPair: string) => void;
  onSecondPair: (secondPair: string) => void;
}

const PairNameInput = ({ onFirstPair, onSecondPair }: PairNameInputProps) => {
  const { firstPair, secondPair, handleFirstPair, handleSecondPair } = usePairNameInputs();

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
          value={firstPair.value}
          status={firstPair.status}
          message={firstPair.message}
          onChange={(event) => handleFirstPair(event)}
          onBlur={() => onFirstPair(firstPair.value)}
        />
      </S.InputContainer>
      <S.InputContainer>
        <Input
          placeholder="이름을 입력해주세요"
          label="함께할 페어의 이름은 무엇인가요?"
          value={secondPair.value}
          status={secondPair.status}
          message={secondPair.message}
          onChange={(event) => handleSecondPair(event)}
          onBlur={() => onSecondPair(secondPair.value)}
        />
      </S.InputContainer>
    </S.Layout>
  );
};

export default PairNameInput;

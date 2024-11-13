/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';

import Button from '@/components/_common/Button/Button';
import { InputField } from '@/components/_common/InputField';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import { validateTimerDuration } from '@/validations/validateTimerDuration';

import * as S from './TimerDurationInput.styles';

const OPTIONS = [
  { label: '10분', value: '10' },
  { label: '15분', value: '15' },
  { label: '30분', value: '30' },
];

interface TimerDurationInputProps {
  timerDuration: string;
  onTimerDuration: (timerDuration: string) => void;
}

const TimerDurationInput = ({ timerDuration, onTimerDuration }: TimerDurationInputProps) => {
  const [isCustom, setIsCustom] = useState(false);

  const handleIsCustomTime = () => {
    if (!isCustom) setIsCustom(true);
    onTimerDuration('');
  };

  const handleOptionTime = (option: string) => {
    if (isCustom) setIsCustom(false);
    onTimerDuration(option);
  };

  const handleCustomTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTimerDuration(event.target.value);
  };

  return (
    <S.Layout aria-label="총 3개의 설정 항목 중 3번째 항목입니다.">
      <S.HeaderContainer>
        <S.TitleContainer>
          <S.Title>타이머 설정</S.Title>
          <S.SubTitle>타이머 시간을 설정해 주세요.</S.SubTitle>
        </S.TitleContainer>
        <InformationBox
          title="왜 타이머 시간을 설정해야 하나요?"
          description="정기적인 역할 교대는 피드백을 주고받을 수 있는 자연스러운 기회를 제공합니다. 이는 코드 품질을 높이고, 문제를
          조기에 발견하여 수정할 수 있게 합니다."
        />
      </S.HeaderContainer>
      <S.ButtonContainer>
        {OPTIONS.map((option) => (
          <Button
            key={option.value}
            color="primary"
            borderRadius="1rem"
            size="md"
            filled={timerDuration === option.value}
            onClick={() => handleOptionTime(option.value)}
          >
            {option.label}
          </Button>
        ))}
        <S.InputContainer>
          <Button
            key="직접 설정"
            color="primary"
            borderRadius="1rem"
            size="md"
            filled={isCustom}
            onClick={handleIsCustomTime}
          >
            직접 설정
          </Button>
          {isCustom && (
            <InputField gap="0.5rem" width="20rem">
              <InputField.Input
                autoFocus
                aria-label="타이머 시간을 분 단위로 입력해 주세요."
                borderRadius="1rem"
                height="4rem"
                value={timerDuration}
                placeholder="타이머 시간 (분)"
                status={!validateTimerDuration(timerDuration) ? 'ERROR' : 'DEFAULT'}
                disabled={!isCustom}
                onChange={handleCustomTime}
              />
              <InputField.Message status={!validateTimerDuration(timerDuration) ? 'ERROR' : 'DEFAULT'}>
                {!validateTimerDuration(timerDuration) ? '1 이상 99 이하의 숫자를 입력해 주세요.' : ''}
              </InputField.Message>
            </InputField>
          )}
        </S.InputContainer>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default TimerDurationInput;

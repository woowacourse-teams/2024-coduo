import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import { validateTime } from '@/utils/PairRoomOnboarding/validate';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './TimerSelection.styles';

const OPTIONS = [
  { label: '10분', value: 10 * 60 * 1000 },
  { label: '15분', value: 15 * 60 * 1000 },
  { label: '30분', value: 30 * 60 * 1000 },
];

interface TimerSettingSectionProps {
  onPrev: () => void;
  onNext: (timer: number) => void;
}

const TimerSelection = ({ onPrev, onNext }: TimerSettingSectionProps) => {
  const [timer, setTimer] = useState(0);
  const [isCustom, setIsCustom] = useState(false);

  const handleIsCustomTime = () => {
    if (!isCustom) setIsCustom(true);
    setTimer(0);
  };

  const handleOptionTime = (option: number) => {
    if (isCustom) setIsCustom(false);
    setTimer(option);
  };

  const handleCustomTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimer(Number(event.target.value) * 60 * 1000);
  };

  const isNextDisabled = timer === 0 || (isCustom && !validateTime(timer));

  return (
    <S.Layout>
      <S.Container>
        <S.HeaderContainer>
          <Modal.Header title="타이머 설정" subTitle="타이머 시간을 설정해 주세요" />
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
              size="md"
              filled={timer === option.value}
              onClick={() => handleOptionTime(option.value)}
            >
              {option.label}
            </Button>
          ))}
          <S.InputContainer>
            <Button key="직접 설정" color="primary" size="md" filled={isCustom} onClick={handleIsCustomTime}>
              직접 설정
            </Button>
            {isCustom && (
              <Input
                width="16rem"
                $css={S.inputStyles}
                value={timer}
                placeholder="타이머 시간 (분)"
                status={!validateTime(timer) ? 'ERROR' : 'DEFAULT'}
                message={!validateTime(timer) ? '0 이상의 숫자를 입력해 주세요.' : ''}
                disabled={!isCustom}
                onChange={handleCustomTime}
              />
            )}
          </S.InputContainer>
        </S.ButtonContainer>
      </S.Container>
      <Modal.Footer position="CENTER">
        <Button onClick={onPrev}>{BUTTON_TEXT.BACK}</Button>
        <Button onClick={() => onNext(timer)} disabled={isNextDisabled}>
          {BUTTON_TEXT.COMPLETE}
        </Button>
      </Modal.Footer>
    </S.Layout>
  );
};

export default TimerSelection;

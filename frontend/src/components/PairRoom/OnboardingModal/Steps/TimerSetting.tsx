import { useState } from 'react';

import { RiInformation2Line } from 'react-icons/ri';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import { TIMER_OPTIONS } from '@/components/PairRoom/OnboardingModal/constants';

import { validateTime } from '@/utils/validate';

import * as S from './Steps.styles';

interface TimerSettingProps {
  timer: string;
  onTimer: (time: string) => void;
}

const TimerSetting = ({ timer, onTimer }: TimerSettingProps) => {
  const [isSelf, setIsSelf] = useState(false);

  const handleTimer = (option: string) => {
    if (isSelf) setIsSelf(false);
    onTimer(option);
  };

  const handleIsSelf = () => {
    if (!isSelf) setIsSelf(true);
    onTimer('');
  };

  return (
    <S.Layout>
      <Modal.Header title="타이머 설정" subTitle="타이머 시간을 설정해 주세요" />
      <S.InformationWrapper>
        <S.InformationTitle>
          <RiInformation2Line size="2rem" />왜 타이머 시간을 설정해야 하나요?
        </S.InformationTitle>
        <S.InformationDescription>
          정기적인 역할 교대는 피드백을 주고받을 수 있는 자연스러운 기회를 제공합니다. 이는 코드 품질을 높이고, 문제를
          조기에 발견하여 수정할 수 있게 합니다.
        </S.InformationDescription>
      </S.InformationWrapper>
      <S.SettingsContainer>
        {TIMER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            color="primary"
            size="md"
            filled={timer === option.value}
            onClick={() => handleTimer(option.value)}
          >
            {option.label}
          </Button>
        ))}
        <S.TimeInputWrapper>
          <Button key="직접 설정" color="primary" size="md" filled={isSelf} onClick={handleIsSelf}>
            직접 설정
          </Button>
          {isSelf && (
            <Input
              width="16rem"
              $css={S.inputStyles}
              value={timer}
              placeholder="타이머 시간 (분)"
              status={!validateTime(Number(timer)) ? 'error' : 'default'}
              message={!validateTime(Number(timer)) ? '0 이상의 숫자를 입력해 주세요.' : ''}
              disabled={!isSelf}
              onChange={(event) => onTimer(event.target.value)}
            />
          )}
        </S.TimeInputWrapper>
      </S.SettingsContainer>
    </S.Layout>
  );
};

export default TimerSetting;

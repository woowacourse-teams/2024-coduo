import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import InformationBox from '@/components/PairRoomOnBoarding/InformationBox/InformationBox';

import { validateTime } from '@/utils/PairRoomOnboarding/validate';

import * as S from './TimerSettingSection.styles';

const OPTIONS = [
  { label: '10분', value: '10' },
  { label: '15분', value: '15' },
  { label: '30분', value: '30' },
];

interface TimerSettingSectionProps {
  timer: string;
  onTimer: (time: string) => void;
}

const TimerSettingSection = ({ timer, onTimer }: TimerSettingSectionProps) => {
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
            color="PRIMARY"
            size="MD"
            filled={timer === option.value}
            onClick={() => handleTimer(option.value)}
          >
            {option.label}
          </Button>
        ))}
        <S.InputContainer>
          <Button key="직접 설정" color="PRIMARY" size="MD" filled={isSelf} onClick={handleIsSelf}>
            직접 설정
          </Button>
          {isSelf && (
            <Input
              width="16rem"
              $css={S.inputStyles}
              value={timer}
              placeholder="타이머 시간 (분)"
              status={!validateTime(timer) ? 'ERROR' : 'DEFAULT'}
              message={!validateTime(timer) ? '0 이상의 숫자를 입력해 주세요.' : ''}
              disabled={!isSelf}
              onChange={(event) => onTimer(event.target.value)}
            />
          )}
        </S.InputContainer>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default TimerSettingSection;

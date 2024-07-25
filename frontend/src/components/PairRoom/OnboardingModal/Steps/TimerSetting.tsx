import { RiInformation2Line } from 'react-icons/ri';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import { TIMER_OPTIONS } from '@/components/PairRoom/OnboardingModal/constants';

import * as S from './Steps.styles';

interface TimerSettingProps {
  timer: string | undefined;
  setTimer: (value: string) => void;
}

const TimerSetting = ({ timer, setTimer }: TimerSettingProps) => (
  <>
    <Modal.Header title="타이머 설정" subTitle="타이머 시간을 설정해 주세요" />
    <S.Layout>
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
        <S.TimeSelectContainer>
          <S.TimeSelectTitle>타이머 시간</S.TimeSelectTitle>
          <S.TimeSelectButtonWrapper>
            {TIMER_OPTIONS.map((option) => (
              <Button
                key={option.value}
                color="primary"
                filled={timer === option.value}
                onClick={() => setTimer(option.value)}
                size="lg"
              >
                {option.label}
              </Button>
            ))}
          </S.TimeSelectButtonWrapper>
          <Input
            label="직접 설정"
            placeholder="타이머 시간 (분)"
            width="100%"
            value={timer}
            type="number"
            onChange={(event) => setTimer(event.target.value)}
          />
        </S.TimeSelectContainer>
      </S.SettingsContainer>
    </S.Layout>
  </>
);

export default TimerSetting;

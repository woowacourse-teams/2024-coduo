import { RiInformation2Line } from 'react-icons/ri';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import {
  DIRECT_INPUT_LABEL,
  TIMER_OPTIONS,
  TIMER_PLACEHOLDER,
  WHY_SET_TIMER_DESCRIPTION,
  WHY_SET_TIMER_TITLE,
} from '@/components/PairRoom/PairRoomOnboardingModal/constants';

import * as S from './Steps.styles';

interface TimerSettingProps {
  timer: string | undefined;
  setTimer: (value: string) => void;
}

const TimerSetting = ({ timer, setTimer }: TimerSettingProps) => (
  <S.Layout>
    <S.InformationWrapper>
      <S.InformationTitle>
        <RiInformation2Line size="2rem" />
        {WHY_SET_TIMER_TITLE}
      </S.InformationTitle>
      <S.InformationDescription>{WHY_SET_TIMER_DESCRIPTION}</S.InformationDescription>
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
          label={DIRECT_INPUT_LABEL}
          placeholder={TIMER_PLACEHOLDER}
          width="100%"
          value={timer}
          type="number"
          onChange={(event) => setTimer(event.target.value)}
        />
      </S.TimeSelectContainer>
    </S.SettingsContainer>
  </S.Layout>
);

export default TimerSetting;

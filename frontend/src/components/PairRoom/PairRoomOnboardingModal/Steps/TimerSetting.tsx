import { RiInformation2Line } from 'react-icons/ri';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

import * as S from './Steps.styles';

interface TimerSettingProps {
  timer: string | undefined;
  setTimer: (value: string) => void;
}

const TimerSetting = ({ timer, setTimer }: TimerSettingProps) => (
  <S.Layout>
    <S.InformationWrapper>
      <S.InformationTitle>
        <RiInformation2Line size="2rem" />왜 타이머 시간을 설정해야 하나요?
      </S.InformationTitle>
      <S.InformationDescription>
        정기적인 역할 교대는 피드백을 주고받을 수 있는 자연스러운 기회를 제공합니다. <br />
        이는 코드 품질을 높이고, 문제를 조기에 발견하여 수정할 수 있게 합니다.
      </S.InformationDescription>
    </S.InformationWrapper>
    <S.SettingsContainer>
      <S.TimeSelectContainer>
        <S.TimeSelectTitle>타이머 시간</S.TimeSelectTitle>
        <S.TimeSelectButtonWrapper>
          <Button color="primary" filled={timer === '10'} onClick={() => setTimer('10')} size="lg">
            10분
          </Button>
          <Button color="primary" filled={timer === '15'} onClick={() => setTimer('15')} size="lg">
            15분
          </Button>
          <Button color="primary" filled={timer === '30'} onClick={() => setTimer('30')} size="lg">
            30분
          </Button>
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
);

export default TimerSetting;

import { RiInformation2Line } from 'react-icons/ri';

import Input from '@/components/common/Input/Input';

import * as S from './Steps.styles';

interface TimerSettingProps {
  timer: string | undefined;
  setTimer: (value: string) => void;
}

const TimerSetting = ({ timer, setTimer }: TimerSettingProps) => (
  <>
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
      <Input
        label="타이머"
        placeholder="타이머 시간 (분)"
        width="90%"
        value={timer}
        type="number"
        onChange={(event) => setTimer(event.target.value)}
      />
    </S.SettingsContainer>
  </>
);

export default TimerSetting;

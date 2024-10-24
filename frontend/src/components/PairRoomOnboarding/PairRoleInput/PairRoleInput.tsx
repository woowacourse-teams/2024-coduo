import { useEffect, useState } from 'react';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import HiddenMessage from '@/components/common/HiddenMessage/HiddenMessage';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import type { Role } from '@/hooks/PairRoomOnboarding/usePairRoomInformation';

import * as S from './PairRoleInput.styles';

interface PairRoleInputProps {
  userPairName: string;
  pairName: string;
  driver: string;
  navigator: string;
  onPairRole: (name: string, role: Role) => void;
}

const PairRoleInput = ({ userPairName, pairName, driver, navigator, onPairRole }: PairRoleInputProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (driver && navigator) {
      setMessage(`현재 설정된 드라이버는 ${driver}, 내비게이터는 ${navigator}입니다.`);
    }
  }, [driver, navigator]);

  return (
    <S.Layout aria-label="총 3개의 설정 항목 중 2번째 항목입니다.">
      <HiddenMessage aria-live="polite">{message}</HiddenMessage>
      <S.HeaderContainer>
        <S.TitleContainer role="presentation">
          <S.Title>역할 설정</S.Title>
          <S.SubTitle>드라이버 / 내비게이터를 설정해 주세요.</S.SubTitle>
        </S.TitleContainer>
        <InformationBox
          title="드라이버 / 내비게이터가 무엇인가요?"
          description="드라이버는 키보드와 마우스를 사용하여 실제로 코드를 작성하는 사람입니다. 내비게이터는 코드의 논리적 흐름, 설계,
      오류 등을 검토하며, 드라이버에게 피드백을 제공합니다."
        />
      </S.HeaderContainer>
      <S.DropdownContainer>
        <S.DropdownWrapper>
          <S.DropdownLabel>드라이버</S.DropdownLabel>
          <Dropdown
            placeholder={'이름을 선택해주세요.'}
            options={[userPairName, pairName]}
            selectedOption={driver}
            onSelect={(name) => onPairRole(name, 'DRIVER')}
          />
        </S.DropdownWrapper>
        <S.DropdownWrapper>
          <S.DropdownLabel>내비게이터</S.DropdownLabel>
          <Dropdown
            placeholder={'이름을 선택해주세요.'}
            options={[userPairName, pairName]}
            selectedOption={navigator}
            onSelect={(name) => onPairRole(name, 'NAVIGATOR')}
          />
        </S.DropdownWrapper>
      </S.DropdownContainer>
    </S.Layout>
  );
};

export default PairRoleInput;

import { RiInformation2Line } from 'react-icons/ri';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import { Role } from '@/components/PairRoom/PairRoomOnboardingModal/PairRoomOnboardingModal.type';

import * as S from './Steps.styles';

interface RoleSettingProps {
  driver: string;
  navigator: string;
  userOptions: string[];
  handleSelect: (role: Role, option: string) => void;
}

const RoleSetting = ({ driver, navigator, userOptions = [], handleSelect }: RoleSettingProps) => (
  <S.Layout>
    <S.InformationWrapper>
      <S.InformationTitle>
        <RiInformation2Line size="2rem" />
        드라이버 / 내비게이터가 무엇인가요?
      </S.InformationTitle>
      <S.InformationDescription>
        드라이버는 키보드와 마우스를 사용하여 실제로 코드를 작성하는 사람입니다. <br />
        내비게이터는 코드의 논리적 흐름, 설계, 오류 등을 검토하며, 드라이버에게 피드백을 제공합니다.
      </S.InformationDescription>
    </S.InformationWrapper>
    <S.SettingsContainer>
      <S.DropdownWrapper>
        <S.DropdownLabel>드라이버</S.DropdownLabel>
        <Dropdown
          placeholder="이름을 선택해주세요."
          selected={driver}
          onSelect={(option) => handleSelect('driver', option)}
          options={userOptions}
        />
      </S.DropdownWrapper>
      <S.DropdownWrapper>
        <S.DropdownLabel>내비게이터</S.DropdownLabel>
        <Dropdown
          placeholder="이름을 선택해주세요."
          selected={navigator}
          onSelect={(option) => handleSelect('navigator', option)}
          options={userOptions}
        />
      </S.DropdownWrapper>
    </S.SettingsContainer>
  </S.Layout>
);

export default RoleSetting;

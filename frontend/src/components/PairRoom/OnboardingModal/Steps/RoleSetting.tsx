import { RiInformation2Line } from 'react-icons/ri';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import {
  DRIVER_NAVIGATOR_DESCRIPTION,
  DRIVER_NAVIGATOR_TITLE,
  SELECT_NAME_PLACEHOLDER,
} from '@/components/PairRoom/PairRoomOnboardingModal/constants';
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
        {DRIVER_NAVIGATOR_TITLE}
      </S.InformationTitle>
      <S.InformationDescription>{DRIVER_NAVIGATOR_DESCRIPTION}</S.InformationDescription>
    </S.InformationWrapper>
    <S.SettingsContainer>
      <S.DropdownWrapper>
        <S.DropdownLabel>드라이버</S.DropdownLabel>
        <Dropdown
          placeholder={SELECT_NAME_PLACEHOLDER}
          selected={driver}
          onSelect={(option) => handleSelect('driver', option)}
          options={userOptions}
        />
      </S.DropdownWrapper>
      <S.DropdownWrapper>
        <S.DropdownLabel>내비게이터</S.DropdownLabel>
        <Dropdown
          placeholder={SELECT_NAME_PLACEHOLDER}
          selected={navigator}
          onSelect={(option) => handleSelect('navigator', option)}
          options={userOptions}
        />
      </S.DropdownWrapper>
    </S.SettingsContainer>
  </S.Layout>
);

export default RoleSetting;

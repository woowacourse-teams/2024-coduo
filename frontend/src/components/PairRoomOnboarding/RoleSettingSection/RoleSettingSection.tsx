import type { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import { Modal } from '@/components/common/Modal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import * as S from './RoleSettingSection.styles';

interface RoleSettingSectionProps {
  driver: string;
  navigator: string;
  userOptions: string[];
  handleSelect: (option: string, role: Role) => void;
}

const RoleSettingSection = ({ driver, navigator, userOptions, handleSelect }: RoleSettingSectionProps) => {
  return (
    <S.Layout>
      <S.HeaderContainer>
        <Modal.Header title="역할 설정" subTitle="드라이버 / 네비게이터를 설정해 주세요." />
        <InformationBox
          title="드라이버 / 네비게이터가 무엇인가요?"
          description="드라이버는 키보드와 마우스를 사용하여 실제로 코드를 작성하는 사람입니다. 내비게이터는 코드의 논리적 흐름, 설계,
        오류 등을 검토하며, 드라이버에게 피드백을 제공합니다."
        />
      </S.HeaderContainer>
      <S.DropdownContainer>
        <S.DropdownWrapper>
          <S.DropdownLabel>드라이버</S.DropdownLabel>
          <Dropdown
            placeholder={'이름을 선택해주세요.'}
            selected={driver}
            onSelect={(option) => handleSelect(option, 'DRIVER')}
            options={userOptions}
          />
        </S.DropdownWrapper>
        <S.DropdownWrapper>
          <S.DropdownLabel>내비게이터</S.DropdownLabel>
          <Dropdown
            placeholder={'이름을 선택해주세요.'}
            selected={navigator}
            onSelect={(option) => handleSelect(option, 'NAVIGATOR')}
            options={userOptions}
          />
        </S.DropdownWrapper>
      </S.DropdownContainer>
    </S.Layout>
  );
};

export default RoleSettingSection;

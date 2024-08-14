import { useState, useEffect } from 'react';

import type { Role } from '@/pages/PairRoomOnboarding/PairRoomOnboarding.type';

import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown/Dropdown';
import { Modal } from '@/components/common/Modal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from './RoleSelection.styles';

interface RoleSettingSectionProps {
  firstPair: string;
  secondPair: string;
  onNext: (driver: string, navigator: string) => void;
}

const RoleSelection = ({ firstPair, secondPair, onNext }: RoleSettingSectionProps) => {
  const [driver, setDriver] = useState('');
  const [navigator, setNavigator] = useState('');

  const handleRole = (driver: string, navigator: string) => {
    setDriver(driver);
    setNavigator(navigator);
  };

  useEffect(() => {
    if (firstPair !== '' && secondPair !== '') handleRole(firstPair, secondPair);
  }, [firstPair, secondPair]);

  const handleRoleSelect = (name: string, role: Role) => {
    const otherPair = firstPair === name ? secondPair : firstPair;
    switch (role) {
      case 'DRIVER':
        handleRole(name, otherPair);
        return;
      case 'NAVIGATOR':
        handleRole(otherPair, name);
        return;
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.HeaderContainer>
          <Modal.Header title="역할 설정" subTitle="드라이버 / 내비게이터를 설정해 주세요." />
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
              options={[firstPair, secondPair]}
              selected={driver}
              onSelect={(name) => handleRoleSelect(name, 'DRIVER')}
            />
          </S.DropdownWrapper>
          <S.DropdownWrapper>
            <S.DropdownLabel>내비게이터</S.DropdownLabel>
            <Dropdown
              placeholder={'이름을 선택해주세요.'}
              options={[firstPair, secondPair]}
              selected={navigator}
              onSelect={(name) => handleRoleSelect(name, 'NAVIGATOR')}
            />
          </S.DropdownWrapper>
        </S.DropdownContainer>
      </S.Container>
      <Modal.Footer position="CENTER">
        <Button onClick={() => onNext(driver, navigator)}>{BUTTON_TEXT.NEXT}</Button>
      </Modal.Footer>
    </S.Layout>
  );
};

export default RoleSelection;

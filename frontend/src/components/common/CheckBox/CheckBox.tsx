import { useState } from 'react';

import { MdCheck } from 'react-icons/md';

import { theme } from '@/styles/theme';

import * as S from './CheckBox.styles';

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleIsChecked = () => setIsChecked((prev) => !prev);

  return (
    <S.Layout onClick={toggleIsChecked}>
      <S.Input type="checkbox" checked={isChecked} readOnly />
      <S.CheckMark $isChecked={isChecked}>
        {isChecked && <MdCheck size="2rem" color={theme.color.black[10]} />}
      </S.CheckMark>
    </S.Layout>
  );
};

export default CheckBox;

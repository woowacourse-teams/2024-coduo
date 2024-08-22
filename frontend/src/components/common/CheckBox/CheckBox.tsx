import { MdCheck } from 'react-icons/md';

import { theme } from '@/styles/theme';

import * as S from './CheckBox.styles';

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox = ({ isChecked, onClick }: CheckBoxProps) => {
  return (
    <S.Layout onClick={onClick}>
      <S.Input type="checkbox" checked={isChecked} readOnly />
      <S.CheckMark $isChecked={isChecked}>
        {isChecked && <MdCheck size="1.8rem" color={theme.color.black[10]} />}
      </S.CheckMark>
    </S.Layout>
  );
};

export default CheckBox;

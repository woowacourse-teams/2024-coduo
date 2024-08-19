import { AiFillDelete } from 'react-icons/ai';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';

import * as S from './CategoryFilter.styles';

type Icon = 'CHECK' | 'EDIT' | 'DELETE' | 'CANCEL';

interface IconButtonProps {
  onClick?: () => void;
  icon: Icon;
}

const IconButton = ({ onClick, icon }: IconButtonProps) => {
  const GET_ICON = {
    CHECK: <FaCheck />,
    EDIT: <FaPencilAlt />,
    DELETE: <AiFillDelete />,
    CANCEL: <GiCancel />,
  };
  return (
    <S.IconsButton
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick();
      }}
    >
      {GET_ICON[icon]}
    </S.IconsButton>
  );
};

export default IconButton;

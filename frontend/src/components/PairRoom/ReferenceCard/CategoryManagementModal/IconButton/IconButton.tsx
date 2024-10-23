import { ButtonHTMLAttributes } from 'react';

import { LuPencil, LuTrash2, LuCheck, LuArrowLeft } from 'react-icons/lu';

import * as S from './IconButton.styles';

type Icon = 'CHECK' | 'EDIT' | 'DELETE' | 'CANCEL';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
  onClick?: () => void;
}

const ICON_LIST = {
  CHECK: <LuCheck />,
  EDIT: <LuPencil />,
  DELETE: <LuTrash2 />,
  CANCEL: <LuArrowLeft />,
};

const IconButton = ({ icon, onClick, ...props }: IconButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClick) onClick();
  };

  return (
    <S.Layout type="button" onClick={handleClick} {...props}>
      {ICON_LIST[icon]}
    </S.Layout>
  );
};

export default IconButton;

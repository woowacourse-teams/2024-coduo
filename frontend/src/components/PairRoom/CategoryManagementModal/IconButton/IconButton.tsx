import { LuPencil, LuTrash2, LuCheck, LuArrowLeft } from 'react-icons/lu';

import * as S from './IconButton.styles';

type Icon = 'CHECK' | 'EDIT' | 'DELETE' | 'CANCEL';

interface IconButtonProps {
  icon: Icon;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const ICON_LIST = {
  CHECK: <LuCheck />,
  EDIT: <LuPencil />,
  DELETE: <LuTrash2 />,
  CANCEL: <LuArrowLeft />,
};

const IconButton = ({ icon, type = 'button', onClick }: IconButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onClick) onClick();
  };

  return (
    <S.Layout type={type} onClick={handleClick}>
      {ICON_LIST[icon]}
    </S.Layout>
  );
};

export default IconButton;

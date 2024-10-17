import { ImExit } from 'react-icons/im';

import * as S from './DeleteButton.styles';

interface DeleteButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const DeleteButton = ({ isOpen, onClick }: DeleteButtonProps) => (
  <S.Layout onClick={onClick}>
    <ImExit size="1.5rem" />
    {isOpen && <span>페어룸 종료하기</span>}
  </S.Layout>
);

export default DeleteButton;

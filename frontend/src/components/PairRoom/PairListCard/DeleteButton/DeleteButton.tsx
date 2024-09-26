import { FaTrashAlt } from 'react-icons/fa';

import * as S from './DeleteButton.styles';

interface DeleteButtonProps {
  isOpen: boolean;
  onRoomDelete: () => void;
}

const DeleteButton = ({ isOpen, onRoomDelete }: DeleteButtonProps) => (
  <S.Layout onClick={onRoomDelete}>
    <FaTrashAlt size="1.5rem" />
    {isOpen && <span>방 삭제하기</span>}
  </S.Layout>
);

export default DeleteButton;

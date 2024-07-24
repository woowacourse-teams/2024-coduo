import { useNavigate } from 'react-router-dom';

import { FaRegPaste } from 'react-icons/fa6';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';
import * as S from '@/components/CreatePairRoom/CreatePairRoom.styles';

interface CompleteCreatePairRoomModalProps {
  pairRoomCode: string;
  closeModal: () => void;
}
const CompleteCreatePairRoomModal = ({ pairRoomCode, closeModal }: CompleteCreatePairRoomModalProps) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch (event) {
      alert('코드 복사에 실패했습니다.');
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Modal.Body>
        <S.Content>
          <S.PairRoomCode>{pairRoomCode}</S.PairRoomCode>
          <S.IconBox onClick={() => handleCopyClipBoard(pairRoomCode)}>
            <FaRegPaste size={'1.8rem'} />
          </S.IconBox>
        </S.Content>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          닫기
        </Button>
        <Button onClick={() => navigate('/')}>이동</Button>
      </Modal.Footer>
    </>
  );
};

export default CompleteCreatePairRoomModal;

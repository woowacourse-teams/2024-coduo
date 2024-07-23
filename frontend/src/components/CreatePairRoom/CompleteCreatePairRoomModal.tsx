import { FaRegPaste } from 'react-icons/fa6';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';
import * as S from '@/components/CreatePairRoom/CreatePairRoom.styles';

interface CompleteCreatePairRoomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  pairRoomCode: string;
}
const CompleteCreatePairRoomModal = ({ isOpen, closeModal, pairRoomCode }: CompleteCreatePairRoomModalProps) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch (event) {
      alert('코드 복사에 실패했습니다.');
    }
  };

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title="페어룸 만들기 완료" subTitle="아래의 코드를 통해 계속 방에 참가하실 수 있습니다!" />
      <Modal.CloseButton close={closeModal} />
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
        <Button>이동</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteCreatePairRoomModal;

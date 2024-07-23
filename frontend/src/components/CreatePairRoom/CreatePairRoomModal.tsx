import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';
import * as S from '@/components/CreatePairRoom/CreatePairRoom.styles';

interface CreatePairRoomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  isButtonActive: boolean;
  children: React.ReactNode;
  createPairRoom: () => void;
}
const CreatePairRoomModal = ({
  isButtonActive,
  children,
  isOpen,
  closeModal,
  createPairRoom,
}: CreatePairRoomModalProps) => {
  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title="페어룸 만들기" subTitle="여러분의 이름(또는 닉네임)을 알려 주세요!" />
      <Modal.CloseButton close={closeModal} />
      <Modal.Body>
        <S.InputLayout>{children}</S.InputLayout>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          닫기
        </Button>
        <Button
          disabled={!isButtonActive}
          onClick={() => {
            createPairRoom();
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePairRoomModal;

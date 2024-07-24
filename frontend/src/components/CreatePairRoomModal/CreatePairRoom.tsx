import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import * as S from '@/components/CreatePairRoomModal/CreatePairRoomModal.styles';

import usePairNameInputs from '@/hooks/pairRoomModal/usePairNameInputs';

interface CreatePairRoomProps {
  closeModal: () => void;
  createPairRoom: (firstPairName: string, secondPairName: string) => void;
}
const CreatePairRoom = ({ closeModal, createPairRoom }: CreatePairRoomProps) => {
  const { handleFirstPair, handleSecondPair, resetPairName, isButtonActive, firstPair, secondPair } =
    usePairNameInputs();

  const handleCreatePairRoom = () => {
    createPairRoom(firstPair.value, secondPair.value);
    resetPairName();
  };

  const closePairRoomModal = () => {
    closeModal();
    resetPairName();
  };

  return (
    <>
      <Modal.Body>
        <S.InputLayout>
          <Input
            placeholder="이름을 입력해주세요"
            label="페어1"
            status={firstPair.status}
            message={firstPair.message}
            onChange={(event) => handleFirstPair(event)}
          />
          <Input
            placeholder="이름을 입력해주세요"
            label="페어2"
            status={secondPair.status}
            message={secondPair.message}
            onChange={(event) => handleSecondPair(event)}
          />
        </S.InputLayout>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closePairRoomModal} filled={false}>
          닫기
        </Button>
        <Button disabled={!isButtonActive} onClick={handleCreatePairRoom}>
          확인
        </Button>
      </Modal.Footer>
    </>
  );
};

export default CreatePairRoom;

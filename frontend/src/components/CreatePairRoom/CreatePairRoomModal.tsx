import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import * as S from '@/components/CreatePairRoom/CreatePairRoom.styles';

import usePairNameInput from '@/hooks/pairRoomModal/usePairNameInputs';

interface CreatePairRoomModalProps {
  closeModal: () => void;
  createPairRoom: (firstPairName: string, secondPairName: string) => void;
}
const CreatePairRoomModal = ({ closeModal, createPairRoom }: CreatePairRoomModalProps) => {
  const {
    firstPairValidateOnChange,
    secondPairValidateOnChange,
    resetPairNameValue,
    isButtonActive,
    firstPairValue,
    secondPairValue,
  } = usePairNameInput();

  const handleCreatePairRoom = () => {
    createPairRoom(firstPairValue.value, secondPairValue.value);
    resetPairNameValue();
  };

  const closePairRoomModal = () => {
    closeModal();
    resetPairNameValue();
  };

  return (
    <>
      <Modal.Body>
        <S.InputLayout>
          <Input
            placeholder="이름을 입력해주세요"
            label="페어1"
            status={firstPairValue.status}
            message={firstPairValue.message}
            onChange={(event) => firstPairValidateOnChange(event)}
          />
          <Input
            placeholder="이름을 입력해주세요"
            label="페어2"
            status={secondPairValue.status}
            message={secondPairValue.message}
            onChange={(event) => secondPairValidateOnChange(event)}
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

export default CreatePairRoomModal;

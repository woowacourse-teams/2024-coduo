import { useNavigate } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import { InputGroup } from '@/components/_common/InputGroup';
import { Modal } from '@/components/_common/Modal';

import useToastStore from '@/stores/toastStore';

import { getPairRoomExists } from '@/apis/pairRoom';

import useInput from '@/hooks/_common/useInput';

interface PairRoomEntryModal {
  isOpen: boolean;
  closeModal: () => void;
}

const PairRoomEntryModal = ({ isOpen, closeModal }: PairRoomEntryModal) => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();
  const { value, resetValue, handleChange } = useInput();

  const enterPairRoom = async () => {
    const { exists } = await getPairRoomExists(value);

    if (!exists) {
      addToast({ status: 'ERROR', message: '해당 코드와 일치하는 방이 없습니다.' });
      return;
    }

    navigate(`/room/${value}`, { state: { valid: true }, replace: true });
  };

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title="페어룸 참가하기" />
      <Modal.Body>
        <InputGroup>
          <InputGroup.Label>페어룸 참가 코드</InputGroup.Label>
          <InputGroup.Input
            onChange={handleChange}
            value={value}
            placeholder="코드를 입력해 주세요"
            onReset={() => resetValue()}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          닫기
        </Button>
        <Button disabled={!value} onClick={enterPairRoom}>
          완료
        </Button>
      </Modal.Footer>
      <Modal.CloseButton close={closeModal} />
    </Modal>
  );
};

export default PairRoomEntryModal;

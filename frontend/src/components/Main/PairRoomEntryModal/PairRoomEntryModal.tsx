import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';

import useToastStore from '@/stores/toastStore';

import { getPairRoomExists } from '@/apis/pairRoom';

import useInput from '@/hooks/common/useInput';

import { BUTTON_TEXT } from '@/constants/button';

interface PairRoomEntryModal {
  isOpen: boolean;
  closeModal: () => void;
}

const PairRoomEntryModal = ({ isOpen, closeModal }: PairRoomEntryModal) => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();
  const { value, status, message, handleChange } = useInput();

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
      <Modal.CloseButton close={closeModal} />
      <Modal.Body>
        <Input
          placeholder="코드를 입력해 주세요"
          label="페어룸 참가 코드"
          status={status}
          message={message}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          {BUTTON_TEXT.CLOSE}
        </Button>
        <Button disabled={!value} onClick={enterPairRoom}>
          {BUTTON_TEXT.COMPLETE}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PairRoomEntryModal;

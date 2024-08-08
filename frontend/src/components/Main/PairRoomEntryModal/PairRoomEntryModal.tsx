import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';

import useInput from '@/hooks/common/useInput';

import { BUTTON_TEXT } from '@/constants/button';

interface PairRoomEntryModal {
  isOpen: boolean;
  closeModal: () => void;
}

const PairRoomEntryModal = ({ isOpen, closeModal }: PairRoomEntryModal) => {
  const navigate = useNavigate();

  const { value, status, message, handleChange } = useInput();

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
        <Button disabled={!value} onClick={() => navigate(`/room/${value}/onboarding`)}>
          {BUTTON_TEXT.COMPLETE}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PairRoomEntryModal;

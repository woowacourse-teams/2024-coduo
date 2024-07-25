import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';

import useInput from '@/hooks/useInput';

import { addRoomCode } from '@/apis/roomCode';

interface PairRoomEntryModal {
  isOpen: boolean;
  closeModal: () => void;
}

interface InputState {
  status: 'default' | 'error';
  value: string;
  message: string;
}

const PairRoomEntryModal = ({ isOpen, closeModal }: PairRoomEntryModal) => {
  const navigate = useNavigate();
  const { inputValue, handleOnChange } = useInput<InputState>({
    status: 'default',
    value: '',
    message: '',
  });

  const { mutate: addRoomCodeMutation } = useMutation({
    mutationFn: addRoomCode,
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const enterModalButtonDisabled = !inputValue.value;

  return (
    <>
      <Modal isOpen={isOpen} close={closeModal} size="60rem">
        <Modal.Header title="페어룸 참가하기" />
        <Modal.CloseButton close={closeModal} />
        <Modal.Body>
          <Input
            placeholder="코드를 입력해 주세요"
            label="페어룸 참가 코드"
            status={inputValue.status}
            message={inputValue.message}
            onChange={(event) => handleOnChange(event)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={closeModal} filled={false}>
            닫기
          </Button>
          <Button disabled={enterModalButtonDisabled} onClick={() => addRoomCodeMutation(inputValue.value)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PairRoomEntryModal;

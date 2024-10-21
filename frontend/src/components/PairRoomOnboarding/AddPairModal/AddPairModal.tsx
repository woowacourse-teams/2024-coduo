import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';

import useInput from '@/hooks/common/useInput';

import { validatePairInfo } from '@/validations/validatePairName';

interface AddPairModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddPairModal = ({ isOpen, closeModal }: AddPairModalProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();

  const handleCloseModal = () => {
    resetValue();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} close={handleCloseModal} size="60rem">
      <Modal.Header title="페어 정보 연동하기" />
      <Modal.Body>
        <Input
          placeholder="깃허브 아이디를 입력해 주세요."
          label="페어의 깃허브 아이디"
          value={value}
          status={status}
          message={message}
          onChange={(event) => handleChange(event, validatePairInfo(event.target.value))}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} filled={false}>
          닫기
        </Button>
        <Button disabled={validatePairInfo(value).status === 'ERROR'}>연동하기</Button>
      </Modal.Footer>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default AddPairModal;

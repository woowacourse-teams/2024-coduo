import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

interface SkipModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  accessCode: string;
}

const SkipModal = ({ closeModal, isModalOpen, accessCode }: SkipModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isModalOpen} close={closeModal} size="small">
      <Modal.CloseButton close={closeModal} />
      <Modal.Header subTitle="나중에 작성하시겠습니까?" />
      <Modal.Body>🥹 작성된 내용이 모두 사라질 수 있어요!</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          취소
        </Button>
        <Button onClick={() => navigate(`/room/${accessCode}`, { replace: true })}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SkipModal;

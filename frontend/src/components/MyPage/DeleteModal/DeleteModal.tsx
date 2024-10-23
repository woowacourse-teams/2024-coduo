import { Modal } from '@/components/common/Modal';

import * as S from './DeleteModal.styles';

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDeletePairRoom: () => void;
  description: string;
  dangerText: string;
}

const DeleteModal = ({ description, dangerText, isOpen, closeModal, handleDeletePairRoom }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} close={closeModal} size="sm">
      <Modal.CloseButton close={closeModal} />
      <Modal.Body>
        <S.Description>
          {description}
          <br />
          <S.DangerText> {dangerText}</S.DangerText>됩니다.
        </S.Description>
      </Modal.Body>
      <Modal.Footer position="CENTER">
        <S.OutlinedButton filled={false} size="md" onClick={closeModal}>
          취소
        </S.OutlinedButton>
        <S.FilledButton size="md" onClick={handleDeletePairRoom}>
          삭제하기
        </S.FilledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

import { Modal } from '@/components/common/Modal';

import * as S from './PariRoomDeleteModal.styles';

interface PairRoomDeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDeletePairRoom: () => void;
}

const PairRoomDeleteModal = ({ isOpen, closeModal, handleDeletePairRoom }: PairRoomDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} close={closeModal} size="sm">
      <Modal.CloseButton close={closeModal} />
      <Modal.Body>
        <S.Description>
          투두 리스트, 레퍼런스 링크 등<br />
          <S.DangerText> 모든 데이터가 삭제</S.DangerText>됩니다.
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

export default PairRoomDeleteModal;

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './ConfirmModal.styles';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  close: () => void;
}

const ConfirmModal = ({ isOpen, onConfirm, close }: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close} size="sm">
      <Modal.CloseButton close={close} />
      <S.Container>
        <p>정말 종료하시겠습니까?</p>
        페어룸을 종료해도 기록은 다시 확인할 수 있어요.
      </S.Container>
      <Modal.Footer position="CENTER">
        <Button $css={S.cancelButtonStyles} onClick={close}>
          취소
        </Button>
        <Button $css={S.confirmButtonStyles} onClick={onConfirm}>
          종료하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

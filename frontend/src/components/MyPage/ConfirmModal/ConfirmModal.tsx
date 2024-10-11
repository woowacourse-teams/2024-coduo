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
        <p>정말 탈퇴하시겠습니까?</p>
        해당 작업은 다시 복구할 수 없습니다.
      </S.Container>
      <Modal.Footer position="CENTER">
        <Button css={S.confirmButtonStyles} onClick={onConfirm}>
          확인
        </Button>
        <Button css={S.cancelButtonStyles} onClick={close}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

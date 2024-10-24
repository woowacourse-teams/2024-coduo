import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './ConfirmModal.styles';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  subTitle: string;
  confirmText?: string;
  onConfirm: () => void;
  close: () => void;
  type?: 'SUCCESS' | 'DANGER';
}

const ConfirmModal = ({
  isOpen,
  close,
  type = 'DANGER',
  title,
  subTitle,
  confirmText = '확인',
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close} size="sm">
      <Modal.CloseButton close={close} />
      <S.Container $type={type}>
        <p>{title}</p>
        {subTitle}
      </S.Container>
      <Modal.Footer position="CENTER">
        <Button $css={S.cancelButtonStyles} onClick={close}>
          취소
        </Button>
        <Button $css={S.confirmButtonStyles} onClick={onConfirm} fontSize="1.4rem">
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

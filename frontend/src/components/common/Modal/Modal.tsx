import { createPortal } from 'react-dom';

import { MdClose } from 'react-icons/md';

import useEscapeKey from '@/hooks/useEscapeKey';
import useFocusTrap from '@/hooks/useFocusTrap';
import usePreventScroll from '@/hooks/usePreventScroll';

import * as S from './Modal.styles';
import type { Position } from './Modal.type';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  position?: Position;
}

const Modal = ({ isOpen, close, position = 'center', children }: React.PropsWithChildren<ModalProps>) => {
  const modalRef = useFocusTrap(isOpen);

  useEscapeKey(isOpen, close);
  usePreventScroll(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <S.Layout ref={modalRef} $position={position}>
      <S.Backdrop onClick={close} />
      <S.Container $position={position}>
        <S.CloseButton onClick={close}>
          <MdClose size="30" color="#CCC" />
        </S.CloseButton>
        {children}
      </S.Container>
    </S.Layout>,
    document.body,
  );
};

export default Modal;

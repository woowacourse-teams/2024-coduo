import { createPortal } from 'react-dom';

import useEscapeKey from '@/hooks/common/useEscapeKey';
import useFocusTrap from '@/hooks/common/useFocusTrap';
import usePreventScroll from '@/hooks/common/usePreventScroll';

import * as S from './Modal.styles';
import type { Position, Size, BackdropType } from './Modal.type';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  size?: Size | string;
  height?: string;
  position?: Position;
  shadow?: boolean;
  animation?: boolean;
  backdropType?: BackdropType;
}

const Modal = ({
  isOpen,
  close,
  size = 'md',
  height = '',
  position = 'CENTER',
  shadow = true,
  animation = true,
  backdropType = 'OPAQUE',
  children,
}: React.PropsWithChildren<ModalProps>) => {
  const modalRef = useFocusTrap(isOpen);

  useEscapeKey(isOpen, close);
  usePreventScroll(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <S.Layout ref={modalRef} $position={position}>
      <S.Backdrop onClick={close} $backdropType={backdropType} />
      <S.Container $size={size} $height={height} $position={position} $shadow={shadow} $animation={animation}>
        {children}
      </S.Container>
    </S.Layout>,
    document.body,
  );
};

export default Modal;

import * as S from './Footer.styles';

export type Direction = 'left' | 'center' | 'right';

interface FooterProps {
  confirmText?: string;
  cancelText?: string;
  direction?: Direction;
  onConfirm: () => void;
  onCancel: () => void;
}

const Footer = ({
  confirmText = '확인',
  cancelText = '취소',
  direction = 'right',
  onConfirm,
  onCancel,
}: FooterProps) => {
  return (
    <S.Layout $direction={direction}>
      <S.CancelButton onClick={onCancel}>{cancelText}</S.CancelButton>
      <S.ConfirmButton onClick={onConfirm}>{confirmText}</S.ConfirmButton>
    </S.Layout>
  );
};

export default Footer;

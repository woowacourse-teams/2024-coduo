import * as S from './Footer.styles';

export type Direction = 'left' | 'center' | 'right';

interface FooterProps {
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  direction?: Direction;
}

const Footer = ({
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  direction = 'right',
}: FooterProps) => {
  return (
    <S.Layout $direction={direction}>
      <S.CancelButton onClick={onCancel}>{cancelText}</S.CancelButton>
      <S.ConfirmButton onClick={onConfirm}>{confirmText}</S.ConfirmButton>
    </S.Layout>
  );
};

export default Footer;

import { MdClose } from 'react-icons/md';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  close: () => void;
}

const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <S.Button role="button" aria-label="모달 닫기" onClick={close}>
      <MdClose size="3rem" color="#CCC" />
    </S.Button>
  );
};

export default CloseButton;

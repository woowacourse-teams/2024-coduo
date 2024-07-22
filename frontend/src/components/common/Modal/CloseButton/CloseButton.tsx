import { MdClose } from 'react-icons/md';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  close: () => void;
}

const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <S.Button onClick={close}>
      <MdClose size="3rem" color="#CCC" />
    </S.Button>
  );
};

export default CloseButton;

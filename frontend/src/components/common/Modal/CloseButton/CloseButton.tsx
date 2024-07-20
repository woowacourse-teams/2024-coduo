import { MdClose } from 'react-icons/md';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  close: () => void;
}

const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <S.Button onClick={close}>
      <MdClose size="30" color="#CCC" />
    </S.Button>
  );
};

export default CloseButton;

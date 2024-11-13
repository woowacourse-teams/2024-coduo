import { MdClose } from 'react-icons/md';

import IconButton from '@/components/_common/Button/IconButton/IconButton';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  close: () => void;
}

const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <IconButton
      $css={S.buttonStyles}
      aria-label="모달 닫기"
      onClick={close}
      icon={<MdClose size="3rem" color="#5F5F5F" />}
    ></IconButton>
  );
};

export default CloseButton;

import { MdClose } from 'react-icons/md';

import IconButton from '@/components/_common/IconButton/IconButton';

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
      color="#5F5F5F"
      size="xl"
      icon={<MdClose />}
    />
  );
};

export default CloseButton;

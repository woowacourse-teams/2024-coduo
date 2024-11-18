import { MdClose } from 'react-icons/md';

import IconButton from '@/components/_common/IconButton/IconButton';

import { theme } from '@/styles/theme';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  close: () => void;
}

const CloseButton = ({ close }: CloseButtonProps) => {
  return (
    <IconButton
      $css={S.buttonStyles}
      icon={<MdClose />}
      color={theme.color.black[600]}
      size="xl"
      onClick={close}
      aria-label="모달 닫기"
    />
  );
};

export default CloseButton;

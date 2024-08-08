import { Link } from 'react-router-dom';

import { FaRegPaste } from 'react-icons/fa6';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

import { BUTTON_TEXT } from '@/constants/button';

import * as S from '../PairRoomCreateModal.styles';

interface PairRoomCreateCompleteProps {
  accessCode: string;
  closeModal: () => void;
}

const PairRoomCreateComplete = ({ accessCode, closeModal }: PairRoomCreateCompleteProps) => {
  const [isCopy, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
    console.log(isCopy); // TODO: 토스트 알림 로직 추가 필요
  };

  return (
    <>
      <S.ModalBodyWrapper>
        <Modal.Body>
          <S.Content onClick={() => handleCopyClipBoard(accessCode)}>
            <S.PairRoomCode>{accessCode}</S.PairRoomCode>
            <S.IconBox>
              <FaRegPaste size={'1.8rem'} />
            </S.IconBox>
          </S.Content>
        </Modal.Body>
      </S.ModalBodyWrapper>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          {BUTTON_TEXT.CLOSE}
        </Button>
        <Link to={`/room/${accessCode}/onboarding`}>
          <Button>이동</Button>
        </Link>
      </Modal.Footer>
    </>
  );
};

export default PairRoomCreateComplete;

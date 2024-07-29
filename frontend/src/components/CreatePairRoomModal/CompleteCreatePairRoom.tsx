import { Link } from 'react-router-dom';

import { FaRegPaste } from 'react-icons/fa6';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './CreatePairRoomModal.styles';

interface CompleteCreatePairRoomProps {
  accessCode: string;
  closeModal: () => void;
}
const CompleteCreatePairRoom = ({ accessCode, closeModal }: CompleteCreatePairRoomProps) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('코드가 복사되었습니다.');
    } catch (event) {
      alert('코드 복사에 실패했습니다.');
    }
  };

  return (
    <>
      <S.ModalBodyWrapper>
        <Modal.Body>
          <S.Content>
            <S.PairRoomCode>{accessCode}</S.PairRoomCode>
            <S.IconBox onClick={() => handleCopyClipBoard(accessCode)}>
              <FaRegPaste size={'1.8rem'} />
            </S.IconBox>
          </S.Content>
        </Modal.Body>
      </S.ModalBodyWrapper>
      <Modal.Footer>
        <Button onClick={closeModal} filled={false}>
          닫기
        </Button>
        <Link to={`/room/${accessCode}/onboarding`}>
          <Button>이동</Button>
        </Link>
      </Modal.Footer>
    </>
  );
};

export default CompleteCreatePairRoom;

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';
import InformationBox from '@/components/PairRoomOnboarding/InformationBox/InformationBox';

import * as S from './AddPairModal.styles';

interface AddPairModalProps {
  isOpen: boolean;
  close: () => void;
}

const AddPairModal = ({ isOpen, close }: AddPairModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close} size="65rem">
      <S.Layout>
        <S.Header>
          <S.Title>페어 정보 연동하기</S.Title>
          <InformationBox description="페어가 코딩해듀오 회원이라면 깃허브 아이디를 입력하여 간편하게 페어 정보를 연동하세요." />
        </S.Header>
        <Input placeholder="페어의 깃허브 아이디를 입력해 주세요." />
        <Modal.Footer position="CENTER">
          <Button css={S.buttonStyles}>연동하기</Button>
        </Modal.Footer>
      </S.Layout>
    </Modal>
  );
};

export default AddPairModal;

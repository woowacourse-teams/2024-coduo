import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './PairRoomCreateModal.styles';

interface PairRoomCreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PairRoomCreateModal = ({ isOpen, closeModal }: PairRoomCreateModalProps) => {
  // const handleSuccess = () => setStatus('COMPLETE');

  // const { addPairRoom, accessCode, isPending } = useAddPairRoom(handleSuccess);

  // const createPairRoom = (firstPair: string, secondPair: string) => addPairRoom({ firstPair, secondPair });

  // if (isPending)
  //   return (
  //     <Modal isOpen={isOpen} close={handleClose} size="60rem">
  //       <Modal.CloseButton close={handleClose} />
  //       <Modal.Header title="잠시만 기다려주세요..." subTitle="페어룸 생성 중입니다!" />
  //       <Modal.Body>
  //         <Spinner />
  //       </Modal.Body>
  //     </Modal>
  //   );

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.CloseButton close={closeModal} />
      <Modal.Header title="페어룸 선택" subTitle="어떤 방식으로 페어룸을 만들까요?" />
      <S.Layout>
        <Button css={S.buttonStyles} color="secondary" filled={false}>
          그냥 시작할래요
        </Button>
        <Button css={S.buttonStyles} color="secondary">
          미션과 함께 시작할래요
        </Button>
      </S.Layout>
    </Modal>
  );
};

export default PairRoomCreateModal;

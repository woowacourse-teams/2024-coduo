import { Link } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './PairRoomCreateModal.styles';

interface PairRoomCreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PairRoomCreateModal = ({ isOpen, closeModal }: PairRoomCreateModalProps) => {
  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.CloseButton close={closeModal} />
      <Modal.Header title="페어룸 선택" subTitle="어떤 방식으로 페어룸을 만들까요?" />
      <S.Layout>
        <Link to="/onboarding?mission=false">
          <Button css={S.buttonStyles} color="secondary" filled={false} aria-label="미션 없이 그냥 시작할래요">
            그냥 시작할래요
          </Button>
        </Link>
        <Link to="/onboarding?mission=true">
          <Button
            css={S.buttonStyles}
            color="secondary"
            aria-label="Github 리포지토리에서 코딩해듀오가 제공하는 미션과 함께 시작할래요"
          >
            미션과 함께 시작할래요
          </Button>
        </Link>
      </S.Layout>
    </Modal>
  );
};

export default PairRoomCreateModal;

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
      <Modal.Header title="페어룸 선택" subTitle="어떤 방식으로 페어룸을 만들까요?" />
      <S.Layout>
        <Link to="/onboarding?mission=false" aria-label="미션 없이 그냥 시작할래요">
          <Button css={S.buttonStyles} color="secondary" filled={false}>
            그냥 시작할래요
          </Button>
        </Link>
        <Link
          to="/onboarding?mission=true"
          aria-label="코딩해듀오가 깃허브 리포지토리로 제공하는 미션과 함께 시작할래요"
        >
          <Button css={S.buttonStyles} color="secondary">
            미션과 함께 시작할래요
          </Button>
        </Link>
      </S.Layout>
      <Modal.CloseButton close={closeModal} />
    </Modal>
  );
};

export default PairRoomCreateModal;

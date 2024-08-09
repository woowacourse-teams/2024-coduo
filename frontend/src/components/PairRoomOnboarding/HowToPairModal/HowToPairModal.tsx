import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal';

import * as S from './HowToPairModal.styles';

const HowToPairModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <Modal.Header title="페어 프로그래밍을 시작하기 전에..." />
      <Modal.Body>
        <S.RoleTitle>드라이버의 역할</S.RoleTitle>
        <S.RoleDescription>드라이버는 코드 작성에 집중하되, 페어의 피드백과 의도를 경청해야 합니다.</S.RoleDescription>
        <S.RoleTitle>네비게이터의 역할</S.RoleTitle>
        <S.RoleDescription>네비게이터는 드라이버에게 명확하고 구체적인 피드백을 제공해야 합니다.</S.RoleDescription>
        <S.GeneralAdvice>모두에게</S.GeneralAdvice>
        <S.AdviceDescription>
          적절한 휴식과 회고 주기를 정하고, 서로의 피드백을 반영하며 효율적인 협력을 유지해야 합니다.
        </S.AdviceDescription>
      </Modal.Body>
      <Modal.Footer position="CENTER">
        <Button rounded={true} size="xl" onClick={closeModal}>
          시작해 볼까요? 🚀
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HowToPairModal;

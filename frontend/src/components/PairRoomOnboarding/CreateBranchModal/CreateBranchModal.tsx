import { BsArrowReturnRight } from 'react-icons/bs';

import Button from '@/components/common/Button/Button';
import { InputStatus } from '@/components/common/Input/Input.type';
import { Modal } from '@/components/common/Modal';

import useInput from '@/hooks/common/useInput';

import useGetBranches from '@/queries/PairRoomOnboarding/useGetBranches';

import { theme } from '@/styles/theme';

import * as S from './CreateBranchModal.styles';

interface CreateBranchModalProps {
  isOpen: boolean;
  close: () => void;
  currentRepo: string;
  onComplete: (branchName: string) => void;
}

const CreateBranchModal = ({ isOpen, close, currentRepo, onComplete }: CreateBranchModalProps) => {
  const { value, message, handleChange, status } = useInput();

  const { isAlreadyCreated } = useGetBranches(currentRepo);

  const validateBranchName = (name: string) => {
    if (isAlreadyCreated(name)) return { status: 'ERROR' as InputStatus, message: '중복된 브랜치 이름 입니다.' };
    return { status: 'DEFAULT' as InputStatus, message: '' };
  };

  return (
    <Modal isOpen={isOpen} close={close} size="sm">
      <Modal.CloseButton close={close} />
      <Modal.Header title="미션 시작하기" subTitle="브랜치를 생성하여 미션을 시작해주세요."></Modal.Header>
      <Modal.Body>
        <S.ModalContainer>
          <S.MissionRepository>{currentRepo}</S.MissionRepository>
          <S.MissionBranchBox>
            <BsArrowReturnRight size={'3rem'} color={theme.color.black[70]} />
            <S.MissionBranch
              value={value}
              onChange={(event) => handleChange(event, validateBranchName(event.target.value))}
            />
          </S.MissionBranchBox>
          <S.Message>{message}</S.Message>
        </S.ModalContainer>
      </Modal.Body>
      <Modal.Footer position="CENTER">
        <Button disabled={status !== 'DEFAULT' || value === ''} onClick={() => onComplete(value)}>
          브랜치 생성하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBranchModal;

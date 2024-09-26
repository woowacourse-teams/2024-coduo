import { BsArrowReturnRight } from 'react-icons/bs';
import { IoHomeSharp } from 'react-icons/io5';

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
  currentRepository: string;
  onComplete: (branchName: string) => void;
}

const CreateBranchModal = ({ isOpen, close, currentRepository, onComplete }: CreateBranchModalProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();

  const { isAlreadyCreated } = useGetBranches(currentRepository);

  const validateBranchName = (name: string) => {
    if (isAlreadyCreated(name)) return { status: 'ERROR' as InputStatus, message: '중복된 브랜치 이름 입니다.' };
    return { status: 'DEFAULT' as InputStatus, message: '' };
  };

  const handleClose = () => {
    resetValue();
    close();
  };

  return (
    <Modal isOpen={isOpen} close={handleClose} size="sm">
      <Modal.CloseButton close={handleClose} />
      <S.TitleContainer>
        <S.TitleWrapper>
          <S.Title>{currentRepository}</S.Title>
          <S.RepositoryLink to={`https://github.com/coduo-missions/${currentRepository}`} target="_blank">
            <IoHomeSharp />
            미션 내용 확인하기
          </S.RepositoryLink>
        </S.TitleWrapper>
        <S.SubTitle>브랜치를 생성하여 미션을 시작해주세요.</S.SubTitle>
      </S.TitleContainer>
      <Modal.Body>
        <S.ModalContainer>
          <S.MissionRepository>{currentRepository}</S.MissionRepository>
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

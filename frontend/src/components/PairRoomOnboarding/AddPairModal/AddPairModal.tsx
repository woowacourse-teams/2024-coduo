import Button from '@/components/_common/Button/Button';
import { InputGroup } from '@/components/_common/InputGroup';
import { Modal } from '@/components/_common/Modal';

import useToastStore from '@/stores/toastStore';

import { getMemberName } from '@/apis/member';

import useInput from '@/hooks/_common/useInput';

import { validatePairInfo } from '@/validations/validatePairName';

import * as S from './AddPairModal.styles';

interface AddPairModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onPairData: (pairId: string, pairName: string) => void;
}

const AddPairModal = ({ isOpen, closeModal, onPairData }: AddPairModalProps) => {
  const { value, status, message, handleChange, resetValue } = useInput();
  const { addToast } = useToastStore();

  const handleCloseModal = () => {
    resetValue();
    closeModal();
  };

  const connectPairData = async (pairId: string) => {
    try {
      const { memberName } = await getMemberName(pairId);
      onPairData(pairId, memberName);
      handleCloseModal();
      addToast({ status: 'SUCCESS', message: '페어 정보 연동에 성공했습니다.' });
    } catch (error) {
      if (error instanceof Error) {
        addToast({ status: 'ERROR', message: error.message });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} close={handleCloseModal} size="60rem" height="34rem">
      <Modal.Header title="페어 정보 연동하기" />
      <S.Body>
        <InputGroup>
          <InputGroup.Label>페어의 깃허브 아이디</InputGroup.Label>
          <InputGroup.Input
            placeholder="깃허브 아이디를 입력해 주세요."
            value={value}
            onChange={(event) => handleChange(event, validatePairInfo(event.target.value))}
          />
          <InputGroup.Message status={status}>{message}</InputGroup.Message>
        </InputGroup>
      </S.Body>

      <S.Footer>
        <Button onClick={handleCloseModal} filled={false}>
          닫기
        </Button>
        <Button disabled={value.trim() === '' || status === 'ERROR'} onClick={() => connectPairData(value)}>
          연동하기
        </Button>
      </S.Footer>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default AddPairModal;

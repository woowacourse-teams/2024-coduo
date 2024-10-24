import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal';

import useToastStore from '@/stores/toastStore';

import { getMemberName } from '@/apis/member';

import useInput from '@/hooks/common/useInput';

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
        addToast({ status: 'ERROR', message: '회원 정보가 없습니다. 아이디를 다시 확인해 주세요.' });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} close={handleCloseModal} size="60rem" height="30rem">
      <Modal.Header title="페어 정보 연동하기" />
      <S.Body>
        <Input
          placeholder="깃허브 아이디를 입력해 주세요."
          label="페어의 깃허브 아이디"
          value={value}
          status={status}
          message={message}
          onChange={(event) => handleChange(event, validatePairInfo(event.target.value))}
        />
      </S.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal} filled={false}>
          닫기
        </Button>
        <Button disabled={value.trim() === '' || status === 'ERROR'} onClick={() => connectPairData(value)}>
          연동하기
        </Button>
      </Modal.Footer>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default AddPairModal;

import { ChangeEvent } from 'react';

import Button from '@/components/_common/Button/Button';
import { InputField } from '@/components/_common/InputField';
import { Modal } from '@/components/_common/Modal';

import useToastStore from '@/stores/toastStore';

import { getMemberName } from '@/apis/http/member';

import useClickEnterKey from '@/hooks/_common/customEvent/useClickEnterKey';
import useInput from '@/hooks/_common/useInput';

import { validatePairInfo } from '@/validations/validatePairName';

import * as S from './AddPairModal.styles';

interface AddPairModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onPairData: (pairId: string, pairName: string) => void;
}

const AddPairModal = ({ isOpen, closeModal, onPairData }: AddPairModalProps) => {
  const { addToast } = useToastStore();

  const { value, status, message, handleChange, resetValue } = useInput();
  const { buttonRef } = useClickEnterKey(isOpen);

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
        <InputField>
          <InputField.Label>페어의 깃허브 아이디</InputField.Label>
          <InputField.Input
            placeholder="깃허브 아이디를 입력해 주세요."
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event, validatePairInfo(event.target.value))
            }
          />
          <InputField.Message status={status}>{message}</InputField.Message>
        </InputField>
      </S.Body>
      <S.Footer>
        <Button size="lg" onClick={handleCloseModal} filled={false}>
          닫기
        </Button>
        <Button
          ref={buttonRef}
          size="lg"
          disabled={value.trim() === '' || status === 'ERROR'}
          onClick={() => connectPairData(value)}
        >
          연동하기
        </Button>
      </S.Footer>
      <Modal.CloseButton close={handleCloseModal} />
    </Modal>
  );
};

export default AddPairModal;

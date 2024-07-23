import { useRef } from 'react';

import { useMutation } from '@tanstack/react-query';

import Input from '@/components/common/Input/Input';
import CompleteCreatePairRoomModal from '@/components/CreatePairRoom/CompleteCreatePairRoomModal';
import CreatePairRoomModal from '@/components/CreatePairRoom/CreatePairRoomModal';

import usePairNameInput from '@/hooks/pairRoomModal/usePairNameInputs';
import useModal from '@/hooks/useModal';

import { addPairName } from '@/apis/pairName';

interface CreatePairRoomProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreatePairRoom = ({ isOpen, closeModal }: CreatePairRoomProps) => {
  const roomCode = useRef('abcdef');

  //query 는 폴더 구조를 맞추지 않아서 일단 여기에 뒀어요 !
  const { mutate: addPairNameMutation } = useMutation({
    mutationFn: addPairName,
    onSuccess: (data) => {
      roomCode.current = data;
      openCompletePairRoomModal();
      closeModal();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const {
    firstPairValidateOnChange,
    secondPairValidateOnChange,
    resetPairNameValue,
    isButtonActive,
    getPairNameValue,
    firstPairValue,
    secondPairValue,
  } = usePairNameInput();

  const createPairRoom = () => {
    addPairNameMutation(getPairNameValue);
    resetPairNameValue();
  };

  //TODO: query hook 파일로 분리

  const {
    isModalOpen: isOpenCompletePairRoomModal,
    openModal: openCompletePairRoomModal,
    closeModal: closeCompletePairRoomModal,
  } = useModal();

  return (
    <>
      <CreatePairRoomModal
        isButtonActive={isButtonActive}
        isOpen={isOpen}
        closeModal={() => {
          closeModal();
          resetPairNameValue();
        }}
        createPairRoom={createPairRoom}
      >
        <Input
          placeholder="이름을 입력해주세요"
          label="페어1"
          status={firstPairValue.status}
          message={firstPairValue.message}
          onChange={(event) => firstPairValidateOnChange(event)}
        />
        <Input
          placeholder="이름을 입력해주세요"
          label="페어2"
          status={secondPairValue.status}
          message={secondPairValue.message}
          onChange={(event) => secondPairValidateOnChange(event)}
        />
      </CreatePairRoomModal>
      <CompleteCreatePairRoomModal
        pairRoomCode={roomCode.current}
        isOpen={isOpenCompletePairRoomModal}
        closeModal={closeCompletePairRoomModal}
      />
    </>
  );
};

export default CreatePairRoom;

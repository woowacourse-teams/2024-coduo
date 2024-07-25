import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';
import CompleteCreatePairRoomModal from '@/components/CreatePairRoomModal/CompleteCreatePairRoom';
import CreatePairRoom from '@/components/CreatePairRoomModal/CreatePairRoom';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

import { addPairNames } from '@/apis/pairName';

interface CreatePairRoomModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type Status = 'create' | 'complete';

const CreatePairRoomModal = ({ isOpen, closeModal }: CreatePairRoomModalProps) => {
  //query 는 폴더 구조를 맞추지 않아서 일단 여기에 뒀어요 !
  const {
    mutate: addPairNameMutation,
    isPending,
    data,
  } = useMutation({
    mutationFn: addPairNames,
    onSuccess: () => {
      setCreatePairRoomStatus('complete');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const createPairRoom = (firstPairName: string, secondPairName: string) =>
    addPairNameMutation({ firstPairName, secondPairName });

  const [createPairRoomStatus, setCreatePairRoomStatus] = useState<Status>('create');

  //TODO: query hook 파일로 분리

  const { title, subtitle } = PAIR_ROOM_MODAL_INFO[createPairRoomStatus];

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title={title} subTitle={subtitle} />
      <Modal.CloseButton close={closeModal} />
      {!isPending && createPairRoomStatus === 'create' && (
        <CreatePairRoom closeModal={closeModal} createPairRoom={createPairRoom} />
      )}
      {!isPending && createPairRoomStatus === 'complete' && (
        <CompleteCreatePairRoomModal pairRoomCode={data.accessCode} closeModal={closeModal} />
      )}
      {isPending && <p>...Loading</p>}
    </Modal>
  );
};

export default CreatePairRoomModal;

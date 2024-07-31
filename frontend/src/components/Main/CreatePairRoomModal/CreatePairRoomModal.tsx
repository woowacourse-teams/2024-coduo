import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';
import CompleteCreatePairRoom from '@/components/Main/CreatePairRoomModal/CompleteCreatePairRoom';
import CreatePairRoom from '@/components/Main/CreatePairRoomModal/CreatePairRoom';

import { addPairNames } from '@/apis/pairName';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

interface CreatePairRoomModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type Status = 'create' | 'complete';

const CreatePairRoomModal = ({ isOpen, closeModal }: CreatePairRoomModalProps) => {
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

  const createPairRoom = (firstPair: string, secondPair: string) => addPairNameMutation({ firstPair, secondPair });

  const [createPairRoomStatus, setCreatePairRoomStatus] = useState<Status>('create');

  const { title, subtitle } = PAIR_ROOM_MODAL_INFO[createPairRoomStatus];

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title={title} subTitle={subtitle} />
      <Modal.CloseButton close={closeModal} />
      {!isPending && createPairRoomStatus === 'create' && (
        <CreatePairRoom closeModal={closeModal} createPairRoom={createPairRoom} />
      )}
      {!isPending && createPairRoomStatus === 'complete' && (
        <CompleteCreatePairRoom accessCode={data} closeModal={closeModal} />
      )}
      {isPending && <p>...Loading</p>}
    </Modal>
  );
};

export default CreatePairRoomModal;

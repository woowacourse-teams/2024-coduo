import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';

import { addPairNames } from '@/apis/pairName';

import { PAIR_ROOM_MODAL_INFO } from '@/constants/pairRoomModalInfo';

import CreatePairRoom from './PairRoomCreate/PairRoomCreate';
import CompleteCreatePairRoom from './PairRoomCreateComplete/PairRoomCreateComplete';

interface PairRoomCreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type Status = 'CREATE' | 'COMPLETE';

const PairRoomCreateModal = ({ isOpen, closeModal }: PairRoomCreateModalProps) => {
  const {
    mutate: addPairNameMutation,
    isPending,
    data,
  } = useMutation({
    mutationFn: addPairNames,
    onSuccess: () => {
      setCreatePairRoomStatus('COMPLETE');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const createPairRoom = (firstPair: string, secondPair: string) => addPairNameMutation({ firstPair, secondPair });

  const [createPairRoomStatus, setCreatePairRoomStatus] = useState<Status>('CREATE');

  const { title, subtitle } = PAIR_ROOM_MODAL_INFO[createPairRoomStatus];

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title={title} subTitle={subtitle} />
      <Modal.CloseButton close={closeModal} />
      {!isPending && createPairRoomStatus === 'CREATE' && (
        <CreatePairRoom closeModal={closeModal} createPairRoom={createPairRoom} />
      )}
      {!isPending && createPairRoomStatus === 'COMPLETE' && (
        <CompleteCreatePairRoom accessCode={data} closeModal={closeModal} />
      )}
      {isPending && <p>...Loading</p>}
    </Modal>
  );
};

export default PairRoomCreateModal;

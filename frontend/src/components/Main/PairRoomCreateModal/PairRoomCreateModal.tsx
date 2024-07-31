import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';

import { addPairNames } from '@/apis/pairName';

import CreatePairRoom from './PairRoomCreate/PairRoomCreate';
import CompleteCreatePairRoom from './PairRoomCreateComplete/PairRoomCreateComplete';

interface PairRoomCreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type Status = 'create' | 'complete';

const PairRoomCreateModal = ({ isOpen, closeModal }: PairRoomCreateModalProps) => {
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

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title="페어룸 만들기" subTitle="여러분의 이름(또는 닉네임)을 알려 주세요!" />
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

export default PairRoomCreateModal;

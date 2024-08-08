import { useState } from 'react';

import { Modal } from '@/components/common/Modal';

import useAddPairRoom from '@/queries/PairRoom/useAddPairRoom';

import CreatePairRoom from './PairRoomCreate/PairRoomCreate';
import CompleteCreatePairRoom from './PairRoomCreateComplete/PairRoomCreateComplete';

interface PairRoomCreateModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type Status = 'CREATE' | 'COMPLETE';

const PairRoomCreateModal = ({ isOpen, closeModal }: PairRoomCreateModalProps) => {
  const [status, setStatus] = useState<Status>('CREATE');

  const handleSuccess = () => setStatus('COMPLETE');

  const { addPairRoom, accessCode, isPending } = useAddPairRoom(handleSuccess);

  const createPairRoom = (firstPair: string, secondPair: string) => addPairRoom({ firstPair, secondPair });

  return (
    <Modal isOpen={isOpen} close={closeModal} size="60rem">
      <Modal.Header title="페어룸 만들기" subTitle="여러분의 이름(또는 닉네임)을 알려 주세요!" />
      <Modal.CloseButton close={closeModal} />
      {isPending ? (
        <p>...Loading</p>
      ) : (
        <>
          {status === 'CREATE' && <CreatePairRoom closeModal={closeModal} createPairRoom={createPairRoom} />}
          {status === 'COMPLETE' && <CompleteCreatePairRoom accessCode={accessCode} closeModal={closeModal} />}
        </>
      )}
    </Modal>
  );
};

export default PairRoomCreateModal;

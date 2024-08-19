import { useState } from 'react';

import { Modal } from '@/components/common/Modal';
import Spinner from '@/components/common/Spinner/Spinner';

import useAddPairRoom from '@/queries/Main/useAddPairRoom';

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

  const handleClose = () => {
    setStatus('CREATE');
    closeModal();
  };

  const { addPairRoom, accessCode, isPending } = useAddPairRoom(handleSuccess);

  const createPairRoom = (firstPair: string, secondPair: string) => addPairRoom({ firstPair, secondPair });

  return (
    <Modal isOpen={isOpen} close={handleClose} size="60rem">
      <Modal.CloseButton close={handleClose} />
      {isPending ? (
        <>
          <Modal.Header title="잠시만 기다려주세요..." subTitle="페어룸 생성 중입니다!" />
          <Modal.Body>
            <Spinner />
          </Modal.Body>
        </>
      ) : (
        <>
          {status === 'CREATE' && <CreatePairRoom closeModal={handleClose} createPairRoom={createPairRoom} />}
          {status === 'COMPLETE' && <CompleteCreatePairRoom accessCode={accessCode} closeModal={handleClose} />}
        </>
      )}
    </Modal>
  );
};

export default PairRoomCreateModal;

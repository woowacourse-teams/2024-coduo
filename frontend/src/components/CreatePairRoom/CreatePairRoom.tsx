import { useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Modal } from '@/components/common/Modal';
import { PAIR_ROOM_MODAL_INFO } from '@/components/constants/pairRoomModalInfo';
import CompleteCreatePairRoomModal from '@/components/CreatePairRoom/CompleteCreatePairRoomModal';
import CreatePairRoomModal from '@/components/CreatePairRoom/CreatePairRoomModal';

import { addPairName } from '@/apis/pairName';

interface CreatePairRoomProps {
  isOpen: boolean;
  closeModal: () => void;
}

type CreatePairRoomStatus = 'create' | 'complete';

const CreatePairRoom = ({ isOpen, closeModal }: CreatePairRoomProps) => {
  const roomCode = useRef<string>('abcdef');

  //query 는 폴더 구조를 맞추지 않아서 일단 여기에 뒀어요 !
  const { mutate: addPairNameMutation, isPending } = useMutation({
    mutationFn: addPairName,
    onSuccess: (data) => {
      roomCode.current = data;
      setCreatePairRoomStatus('complete');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const createPairRoom = (firstPairName: string, secondPairName: string) =>
    addPairNameMutation({ firstPairName, secondPairName });

  const [createPairRoomStatus, setCreatePairRoomStatus] = useState<CreatePairRoomStatus>('create');

  //TODO: query hook 파일로 분리

  const { title, subtitle } = PAIR_ROOM_MODAL_INFO[createPairRoomStatus];

  return (
    <>
      <Modal isOpen={isOpen} close={closeModal} size="60rem" height="45rem">
        <Modal.Header title={title} subTitle={subtitle} />
        <Modal.CloseButton close={closeModal} />
        {!isPending && createPairRoomStatus === 'create' && (
          <CreatePairRoomModal closeModal={closeModal} createPairRoom={createPairRoom} />
        )}
        {!isPending && createPairRoomStatus === 'complete' && (
          <CompleteCreatePairRoomModal pairRoomCode={roomCode.current} closeModal={closeModal} />
        )}
        {isPending && <p>...Loading</p>}
      </Modal>
    </>
  );
};

export default CreatePairRoom;

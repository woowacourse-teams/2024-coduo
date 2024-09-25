import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { addPairRoom, addPairRoomHistory } from '@/apis/pairRoom';

const useAddPairRoom = () => {
  const navigate = useNavigate();

  const addPairRoomMutation = useMutation({
    mutationFn: addPairRoom,
  });

  const addPairRoomHistoryMutation = useMutation({
    mutationFn: addPairRoomHistory,
  });

  const handleAddPairRoom = async (
    firstPair: string,
    secondPair: string,
    driver: string,
    navigator: string,
    timerDuration: string,
  ) => {
    const accessCode = await addPairRoomMutation.mutateAsync({ firstPair, secondPair });

    await addPairRoomHistoryMutation.mutateAsync({
      driver,
      navigator,
      timerDuration: Number(timerDuration) * 60 * 1000,
      timerRemainingTime: Number(timerDuration) * 60 * 1000,
      accessCode,
    });

    navigate(`/pair-room/${accessCode}`);
  };

  return { handleAddPairRoom, isPending: addPairRoomMutation.isPending || addPairRoomHistoryMutation.isPending };
};

export default useAddPairRoom;

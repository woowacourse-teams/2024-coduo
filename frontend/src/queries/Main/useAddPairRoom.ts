import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairRoom, addPairRoomHistory } from '@/apis/pairRoom';

const useAddPairRoom = () => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();

  const addPairRoomMutation = useMutation({
    mutationFn: addPairRoom,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const addPairRoomHistoryMutation = useMutation({
    mutationFn: addPairRoomHistory,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddPairRoom = async (
    firstPair: string,
    secondPair: string,
    driver: string,
    navigator: string,
    timerDuration: string,
  ) => {
    try {
      const accessCode = await addPairRoomMutation.mutateAsync({ firstPair, secondPair });

      await addPairRoomHistoryMutation.mutateAsync({
        driver,
        navigator,
        timerDuration: Number(timerDuration) * 60 * 1000,
        timerRemainingTime: Number(timerDuration) * 60 * 1000,
        accessCode,
      });

      navigate(`/room/${accessCode}`);
    } catch (error) {
      if (error instanceof Error) addToast({ status: 'ERROR', message: error.message });
    }
  };

  return { handleAddPairRoom, isPending: addPairRoomMutation.isPending || addPairRoomHistoryMutation.isPending };
};

export default useAddPairRoom;

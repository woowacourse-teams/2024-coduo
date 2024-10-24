import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairRoom } from '@/apis/pairRoom';

const useAddPairRoom = () => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: addPairRoom,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
    onSuccess: (accessCode) => navigate(`/room/${accessCode}`, { state: { valid: true }, replace: true }),
  });

  const handleAddPairRoom = async (
    pairId: string,
    driver: string,
    navigator: string,
    missionUrl: string,
    timerDuration: string,
  ) => {
    return mutate({
      pairId,
      driver,
      navigator,
      missionUrl,
      timerDuration: Number(timerDuration) * 60 * 1000,
      timerRemainingTime: Number(timerDuration) * 60 * 1000,
    });
  };

  return { handleAddPairRoom, isPending };
};

export default useAddPairRoom;

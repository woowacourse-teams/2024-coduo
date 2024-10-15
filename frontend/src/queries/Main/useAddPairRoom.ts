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
    onSuccess: (accessCode) => navigate(`/room/${accessCode}`),
  });

  const handleAddPairRoom = async (
    driver: string,
    navigator: string,
    repositoryName: string,
    timerDuration: string,
  ) => {
    return mutate({
      driver,
      navigator,
      missionUrl: `https://github.com/coduo-missions/${repositoryName}`,
      timerDuration: Number(timerDuration) * 60 * 1000,
      timerRemainingTime: Number(timerDuration) * 60 * 1000,
    });
  };

  return { handleAddPairRoom, isPending };
};

export default useAddPairRoom;

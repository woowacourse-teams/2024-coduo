import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairRoomHistory } from '@/apis/pairRoom';

const useAddPairRoomHistory = (accessCode: string) => {
  const { addToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: addPairRoomHistory,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddPairRoomHistory = (
    driver: string,
    navigator: string,
    timerDuration: number,
    timerRemainingTime: number,
  ) => mutate({ driver, navigator, timerDuration, timerRemainingTime, accessCode });

  return { handleAddPairRoomHistory };
};

export default useAddPairRoomHistory;

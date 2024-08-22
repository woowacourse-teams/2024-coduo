import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairRoomHistory } from '@/apis/pairRoom';

const useAddPairRoomHistory = (onSuccess: () => void) => {
  const { addToast } = useToastStore();

  const { mutate, isPending, data } = useMutation({
    mutationFn: addPairRoomHistory,
    onSuccess: onSuccess,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleAddPairRoomHistory = (
    driver: string,
    navigator: string,
    timerDuration: number,
    timerRemainingTime: number,
    accessCode: string,
  ) => mutate({ driver, navigator, timerDuration, timerRemainingTime, accessCode });

  return { handleAddPairRoomHistory, accessCode: data, isPending };
};

export default useAddPairRoomHistory;

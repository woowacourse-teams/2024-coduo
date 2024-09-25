import { useMutation } from '@tanstack/react-query';

import { addPairRoomHistory } from '@/apis/pairRoom';

const useAddPairRoomHistory = (accessCode: string) => {
  const { mutate } = useMutation({
    mutationFn: addPairRoomHistory,
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

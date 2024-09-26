import { useMutation } from '@tanstack/react-query';

import { updateRemainingTime } from '@/apis/pairRoom';

const useUpdateRemainingTime = (accessCode: string) => {
  const { mutate } = useMutation({
    mutationFn: updateRemainingTime,
  });

  const handleUpdateRemainingTime = (remainingTime: number) => mutate({ remainingTime, accessCode });

  return { handleUpdateRemainingTime };
};

export default useUpdateRemainingTime;

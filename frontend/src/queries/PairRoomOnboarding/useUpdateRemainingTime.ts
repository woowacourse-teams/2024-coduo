import { useMutation } from '@tanstack/react-query';

import { updateRemainingTime } from '@/apis/pairRoom';

const useUpdateRemainingTime = () => {
  const { mutate } = useMutation({
    mutationFn: updateRemainingTime,
  });

  const handleUpdateRemainingTime = (remainingTime: string, accessCode: string) =>
    mutate({ remainingTime, accessCode });

  return { handleUpdateRemainingTime };
};

export default useUpdateRemainingTime;

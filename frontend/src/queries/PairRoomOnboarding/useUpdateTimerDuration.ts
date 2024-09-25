import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTimerDuration } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUpdateTimerDuration = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTimerDuration,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_HISTORY] });
    },
  });

  const handleUpdateTimerDuration = (timerDuration: string, accessCode: string) =>
    mutate({ timerDuration, accessCode });

  return { handleUpdateTimerDuration, isPending };
};

export default useUpdateTimerDuration;

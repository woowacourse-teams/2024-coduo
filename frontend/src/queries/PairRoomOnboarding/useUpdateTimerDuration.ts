import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateTimerDuration } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUpdateTimerDuration = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTimerDuration,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_HISTORY] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleUpdateTimerDuration = (timerDuration: string, accessCode: string) =>
    mutate({ timerDuration, accessCode });

  return { handleUpdateTimerDuration, isPending };
};

export default useUpdateTimerDuration;

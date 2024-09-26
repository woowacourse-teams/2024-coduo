import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateDuration } from '@/apis/timer';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUpdateDuration = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateDuration,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM_TIMER] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleUpdateTimerDuration = (duration: string, accessCode: string) => mutate({ duration, accessCode });

  return { handleUpdateTimerDuration, isPending };
};

export default useUpdateDuration;

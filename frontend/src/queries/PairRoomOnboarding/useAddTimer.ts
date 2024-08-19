import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateTimer } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useAddTimer = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTimer,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM] });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { handleAddTimer: mutate, isPending };
};

export default useAddTimer;

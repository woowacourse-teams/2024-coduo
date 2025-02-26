import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateDuration } from '@/apis/http/timer';

const useTimerMutation = () => {
  const { addToast } = useToastStore();

  const { mutate: updateTimerDurationMutation, isPending } = useMutation({
    mutationFn: updateDuration,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { updateTimerDurationMutation, isPending };
};

export default useTimerMutation;

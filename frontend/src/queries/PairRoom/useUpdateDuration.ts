import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateDuration } from '@/apis/timer';

const useUpdateDuration = () => {
  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateDuration,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleUpdateTimerDuration = (duration: string, accessCode: string) => mutate({ duration, accessCode });

  return { handleUpdateTimerDuration, isPending };
};

export default useUpdateDuration;

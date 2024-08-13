import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addTimer } from '@/apis/timer';

const useAddPairRoomInformation = (onSuccess: () => void) => {
  const { addToast } = useToastStore();

  const { mutate, isPending } = useMutation({
    mutationFn: addTimer,
    onSuccess: onSuccess,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { handleAddTimer: mutate, isPending };
};

export default useAddPairRoomInformation;

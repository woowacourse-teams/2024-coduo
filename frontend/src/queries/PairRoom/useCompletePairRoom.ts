import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updatePairRoomStatus } from '@/apis/pairRoom';

const useCompletePairRoom = () => {
  const { addToast } = useToastStore();
  const { mutate } = useMutation({
    mutationFn: updatePairRoomStatus,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleCompletePairRoom = (accessCode: string) => mutate({ accessCode });

  return { handleCompletePairRoom };
};

export default useCompletePairRoom;

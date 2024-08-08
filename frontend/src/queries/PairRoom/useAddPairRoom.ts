import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairNames } from '@/apis/pairName';

const useAddPairRoom = (onSuccess: () => void) => {
  const { addToast } = useToastStore();

  const { mutate, isPending, data } = useMutation({
    mutationFn: addPairNames,
    onSuccess: onSuccess,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { addPairRoom: mutate, accessCode: data, isPending };
};

export default useAddPairRoom;

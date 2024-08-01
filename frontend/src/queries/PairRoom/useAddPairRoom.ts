import { useMutation } from '@tanstack/react-query';

import { addPairNames } from '@/apis/pairName';

const useAddPairRoom = (onSuccess: () => void) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: addPairNames,
    onSuccess: onSuccess,
    onError: (error) => alert(error.message),
  });

  return { addPairRoom: mutate, accessCode: data, isPending };
};

export default useAddPairRoom;

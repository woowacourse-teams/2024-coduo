import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePairRole } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useUpdatePairRoom = (accessCode: string) => {
  const queryClient = useQueryClient();

  const { mutate: updatePairRoleMutation } = useMutation({
    mutationFn: updatePairRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM] }),
  });

  const handleUpdatePairRole = () => updatePairRoleMutation({ accessCode });

  return { handleUpdatePairRole };
};

export default useUpdatePairRoom;

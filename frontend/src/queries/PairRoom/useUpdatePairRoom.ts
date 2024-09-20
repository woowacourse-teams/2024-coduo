import { useMutation } from '@tanstack/react-query';

import { updatePairRole } from '@/apis/pairRoom';

const useUpdatePairRoom = (accessCode: string) => {
  const { mutate: updatePairRoleMutation } = useMutation({
    mutationFn: updatePairRole,
  });

  const handleUpdatePairRole = () => updatePairRoleMutation({ accessCode });

  return { handleUpdatePairRole };
};

export default useUpdatePairRoom;

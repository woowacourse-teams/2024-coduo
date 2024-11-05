import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { deletePairRoom } from '@/apis/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const useDeletePairRoom = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate: deletePairRoomMutation, isPending } = useMutation({
    mutationFn: deletePairRoom,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '페어룸이 삭제되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_MY_PAIR_ROOMS] });
    },
    onError: () => addToast({ status: 'ERROR', message: '페어룸 삭제에 실패했습니다.' }),
  });

  return { deletePairRoomMutation, isPending };
};

export default useDeletePairRoom;

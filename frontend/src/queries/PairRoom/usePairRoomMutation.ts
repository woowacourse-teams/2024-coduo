import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addPairRoom, updatePairRole, updatePairRoomStatus, deletePairRoom } from '@/apis/http/pairRoom';

import { QUERY_KEYS } from '@/constants/queryKeys';

const usePairRoomMutation = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  const { mutate: addPairRoomMutation } = useMutation({
    mutationFn: addPairRoom,
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updatePairRoleMutation } = useMutation({
    mutationFn: updatePairRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PAIR_ROOM] }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: updatePairRoomStatusMutation } = useMutation({
    mutationFn: updatePairRoomStatus,
    onSuccess: () => addToast({ status: 'SUCCESS', message: '페어 프로그래밍이 완료되었습니다.' }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const { mutate: deletePairRoomMutation, isPending: isDeletePairRoomPending } = useMutation({
    mutationFn: deletePairRoom,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '페어룸이 삭제되었습니다.' });
      return queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_MY_PAIR_ROOMS] });
    },
    onError: () => addToast({ status: 'ERROR', message: '페어룸 삭제에 실패했습니다.' }),
  });

  return {
    addPairRoomMutation,
    updatePairRoleMutation,
    updatePairRoomStatusMutation,
    deletePairRoomMutation,
    isDeletePairRoomPending,
  };
};

export default usePairRoomMutation;

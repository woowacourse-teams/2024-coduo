import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updatePairRoomStatus } from '@/apis/pairRoom';

const useCompletePairRoom = (accessCode: string) => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: updatePairRoomStatus,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '페어 프로그래밍이 완료되었습니다.' });
      navigate(`room/${accessCode}/retrospectForm`, { state: { valid: true } });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  const handleCompletePairRoom = (accessCode: string) => mutate({ accessCode });

  return { handleCompletePairRoom };
};

export default useCompletePairRoom;

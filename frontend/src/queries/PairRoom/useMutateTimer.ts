import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { updateDuration } from '@/apis/timer';

const useMutateTimer = () => {
  const { addToast } = useToastStore();

  const { mutate: updateTimerDurationMutation, isPending } = useMutation({
    mutationFn: updateDuration,
    onSuccess: () => addToast({ status: 'SUCCESS', message: '타이머 시간이 성공적으로 변경되었습니다.' }),
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { updateTimerDurationMutation, isPending };
};

export default useMutateTimer;

import { useMutation } from '@tanstack/react-query';

import { createBranch, getSHAforMain } from '@/apis/github';

import useToastStore from '@/stores/toastStore';

const useCreateBranch = (onSuccess: () => void) => {
  const { addToast } = useToastStore();
  const { mutate, isSuccess } = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '미션 시작~' });
      onSuccess();
    },
    onError: () => {
      addToast({ status: 'ERROR', message: '브랜치 생성에 실패했습니다.' });
      //TODO: 추후에 status 분기처리하기
    },
  });

  const handleStartMission = async (currentRepo: string, userId: string) => {
    const sha = await getSHAforMain(currentRepo);
    if (sha && currentRepo != '') {
      mutate({ repositoryName: currentRepo, branchName: userId, sha });
    }
  };

  return { handleStartMission, isSuccess };
};

export default useCreateBranch;

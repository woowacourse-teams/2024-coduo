import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { createBranch, getSHAforMain } from '@/apis/github';

const useCreateBranch = () => {
  const { addToast } = useToastStore();

  const { mutate, isSuccess } = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      addToast({ status: 'SUCCESS', message: '브랜치 생성에 성공했습니다.' });
    },
    onError: () => {
      addToast({ status: 'ERROR', message: '브랜치 생성에 실패했습니다.' });
      //TODO: 추후에 status 분기처리하기
    },
  });

  const handleCreateBranch = async (currentRepository: string, branchName: string) => {
    const sha = await getSHAforMain(currentRepository);

    if (sha && currentRepository != '') {
      mutate({ repositoryName: currentRepository, branchName, sha });
    }
  };

  return { handleCreateBranch, isSuccess };
};

export default useCreateBranch;

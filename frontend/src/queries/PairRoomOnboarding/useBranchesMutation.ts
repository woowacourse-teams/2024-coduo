import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { addBranch, getSHAforMain } from '@/apis/http/github';

const useBranchesMutation = () => {
  const { addToast } = useToastStore();

  const { mutate, isSuccess } = useMutation({
    mutationFn: addBranch,
    onSuccess: () => addToast({ status: 'SUCCESS', message: '브랜치 생성에 성공했습니다.' }),
    onError: () => addToast({ status: 'ERROR', message: '브랜치 생성에 실패했습니다.' }),
  });

  const handleAddBranch = async (currentRepository: string, branchName: string) => {
    const sha = await getSHAforMain(currentRepository);

    if (sha && currentRepository != '') {
      mutate({ repositoryName: currentRepository, branchName, sha });
    }
  };

  return { handleAddBranch, isSuccess };
};

export default useBranchesMutation;

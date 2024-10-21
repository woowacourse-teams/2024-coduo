import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getMemberName } from '@/apis/member';

const useGetMemberName = (onSuccess: (pairName: string) => void) => {
  const { addToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: getMemberName,
    onSuccess: ({ username }) => {
      onSuccess(username);
      addToast({ status: 'SUCCESS', message: '페어 정보 연동에 성공했습니다.' });
    },
    onError: () => addToast({ status: 'ERROR', message: '회원 정보가 없습니다. 아이디를 다시 확인해 주세요.' }),
  });

  const handleGetMemberName = (userId: string) => mutate({ userId });

  return { handleGetMemberName };
};

export default useGetMemberName;

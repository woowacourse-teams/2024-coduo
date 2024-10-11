import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';
import useUserStore from '@/stores/userStore';

import { deleteMember } from '@/apis/member';

const useDeleteMember = () => {
  const navigate = useNavigate();

  const { resetUser } = useUserStore();
  const { addToast } = useToastStore();

  const { mutate: handleDeleteMember, isSuccess } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      resetUser();
      addToast({ status: 'SUCCESS', message: '회원 탈퇴에 성공했습니다.' });
      navigate('/', { replace: true });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { handleDeleteMember, isSuccess };
};

export default useDeleteMember;

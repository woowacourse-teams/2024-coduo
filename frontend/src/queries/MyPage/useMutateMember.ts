import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';
import useUserStore from '@/stores/userStore';

import { deleteMember } from '@/apis/member';

const useMutateMember = () => {
  const navigate = useNavigate();

  const { resetUser } = useUserStore();
  const { addToast } = useToastStore();

  const { mutate: deleteMemberMutation, isSuccess } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      resetUser();
      addToast({ status: 'SUCCESS', message: '지금까지 코딩해듀오와 함께 해 주셔서 감사해요. 다음에 또 만나요 👋🏻' });
      navigate('/', { replace: true });
    },
    onError: (error) => addToast({ status: 'ERROR', message: error.message }),
  });

  return { deleteMemberMutation, isSuccess };
};

export default useMutateMember;

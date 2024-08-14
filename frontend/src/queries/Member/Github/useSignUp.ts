import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';
import useUserStatusStore from '@/stores/userStatusStore';

import { addSignUpGithub } from '@/apis/oauth';

const useSignUp = () => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const { setUserStatus } = useUserStatusStore();
  const { mutate, isSuccess } = useMutation({
    mutationFn: (username: string) => addSignUpGithub(username),
    onSuccess: () => {
      setUserStatus('SIGNED_IN');
      navigate('/');
    },
    onError: () => {
      addToast({ status: 'ERROR', message: '회원가입 실패' });
    },
  });

  return { mutate, isSuccess };
};

export default useSignUp;

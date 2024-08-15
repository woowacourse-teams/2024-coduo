import { useNavigate } from 'react-router-dom';

import useUserStatusStore from '@/stores/userStatusStore';

import { addSignUpGithub } from '@/apis/oauth';

const useSignUpHandler = () => {
  const { setUserStatus } = useUserStatusStore();
  const navigate = useNavigate();

  const handleSignUp = async (username: string) => {
    await addSignUpGithub(username);
    setUserStatus('SIGNED_IN');
    navigate('/');
  };

  return { handleSignUp };
};
export default useSignUpHandler;

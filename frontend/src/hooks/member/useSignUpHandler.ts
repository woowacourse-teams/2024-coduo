import { useNavigate } from 'react-router-dom';

import useUserStatusStore from '@/stores/userStatusStore';

import { addSignUp } from '@/apis/oauth';

const useSignUpHandler = () => {
  const { setUserStatus } = useUserStatusStore();
  const navigate = useNavigate();

  const handleSignUp = async (username: string) => {
    await addSignUp(username);
    setUserStatus('SIGNED_IN');
    navigate('/');
  };

  return { handleSignUp };
};
export default useSignUpHandler;

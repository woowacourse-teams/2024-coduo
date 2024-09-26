import { useNavigate } from 'react-router-dom';

import useUserStore from '@/stores/userStore';

import { addSignUp } from '@/apis/oauth';

const useSignUpHandler = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const handleSignUp = async (username: string) => {
    await addSignUp(username);

    setUser(username, 'SIGNED_IN');

    navigate('/main');
  };

  return { handleSignUp };
};
export default useSignUpHandler;

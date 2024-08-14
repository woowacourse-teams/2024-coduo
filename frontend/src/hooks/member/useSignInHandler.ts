import { useNavigate } from 'react-router-dom';

import useUserStatusStore from '@/stores/userStatusStore';

import useSignIn from '@/queries/Member/Github/useSignIn';

const useSignInHandler = () => {
  const { setUserStatus } = useUserStatusStore();
  const navigate = useNavigate();
  const { isSuccess, data, refetch } = useSignIn();

  const handleSignInGithub = async () => {
    await refetch();
    if (!isSuccess || !data) {
      return;
    }
    if (!data.signedIn) {
      setUserStatus('SIGN_UP');
      navigate('/sign-up');
    }
    if (data.signedIn) {
      setUserStatus('SIGNED_IN');
    }
  };

  return { handleSignInGithub };
};

export default useSignInHandler;

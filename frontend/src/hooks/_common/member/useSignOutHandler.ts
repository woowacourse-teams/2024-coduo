import { useNavigate } from 'react-router-dom';

import useUserStore from '@/stores/userStore';

import { getSignOut } from '@/apis/member';

const useSignOutHandler = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSignOut = async () => {
    await getSignOut();
    setUser('', 'SIGNED_OUT');
    document.cookie = 'whoami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return { handleSignOut };
};

export default useSignOutHandler;

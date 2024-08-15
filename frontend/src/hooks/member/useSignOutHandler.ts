import { useNavigate } from 'react-router-dom';

import useUserStatusStore from '@/stores/userStatusStore';

import { getSignOut } from '@/apis/signOut';

const useSignOutHandler = () => {
  const { setUserStatus } = useUserStatusStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await getSignOut();
    setUserStatus('SIGNED_OUT');
    document.cookie = 'whoami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return { handleSignOut };
};

export default useSignOutHandler;

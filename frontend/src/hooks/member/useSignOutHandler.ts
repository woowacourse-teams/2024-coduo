import { useNavigate } from 'react-router-dom';

import useUserStatusStore from '@/stores/userStatusStore';

import { getSignOut } from '@/apis/signOut';

const useSignOutHandler = () => {
  const navigate = useNavigate();
  const { setUserStatus } = useUserStatusStore();

  const handleSignOut = async () => {
    await getSignOut();
    setUserStatus('SIGNED_OUT');
    document.cookie = 'whoami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/landing');
  };

  return { handleSignOut };
};

export default useSignOutHandler;

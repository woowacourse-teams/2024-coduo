import useUserStatusStore from '@/stores/userStatusStore';

import { getSignOut } from '@/apis/signOut';

const useSignOutHandler = () => {
  const { setUserStatus } = useUserStatusStore();

  const handleSignOut = async () => {
    await getSignOut();
    setUserStatus('SIGNED_OUT');
    document.cookie = 'whoami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return { handleSignOut };
};

export default useSignOutHandler;

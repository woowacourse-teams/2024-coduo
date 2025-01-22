import { getSignInGithub } from '@/apis/oauth';

const useSignInHandler = () => {
  const handleSignInGithub = async () => {
    const response = await getSignInGithub();
    window.location.href = response.endpoint;
  };

  return { handleSignInGithub };
};

export default useSignInHandler;

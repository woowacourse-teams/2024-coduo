import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface SignInGithubResponse {
  signedIn: boolean;
}

export const getSignInGithub = async (): Promise<SignInGithubResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/sign-in/oauth/github`,
    errorMessage: ERROR_MESSAGES.SIGN_IN,
  });

  return await response.json();
};

export const addSignUpGithub = async (username: string): Promise<void> => {
  const response = await fetcher.post({
    url: `${API_URL}/sign-up/oauth/github`,
    body: JSON.stringify({ username }),
    errorMessage: ERROR_MESSAGES.SIGN_UP,
  });

  return await response.json();
};

import fetcher from '@/apis/fetcher/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface SignInGithubResponse {
  endpoint: string;
}

export const getSignInGithub = async (): Promise<SignInGithubResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/sign-in/oauth/github`,
    errorMessage: ERROR_MESSAGES.SIGN_IN,
  });

  return await response.json();
};

export interface IsUserLoggedInResponse {
  signedIn: boolean;
}

export const getIsUserLoggedIn = async (): Promise<IsUserLoggedInResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/sign-in/check`,
    errorMessage: ERROR_MESSAGES.CHECK_USER_LOGIN,
  });

  return await response.json();
};

export const addSignUp = async (username: string): Promise<void> => {
  const response = await fetcher.post({
    url: `${API_URL}/sign-up`,
    body: JSON.stringify({ username }),
    errorMessage: ERROR_MESSAGES.SIGN_UP,
  });

  return await response.json();
};

export interface SignInCallbackResponse {
  signedUp: boolean;
}

export const getSignInCallback = async (): Promise<SignInCallbackResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/sign-in/callback`,
    errorMessage: ERROR_MESSAGES.SIGN_IN,
  });

  return await response.json();
};

import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export const getSignOut = async (): Promise<void> => {
  await fetcher.get({
    url: `${API_URL}/sign-out`,
    errorMessage: ERROR_MESSAGES.SIGN_OUT,
  });
};

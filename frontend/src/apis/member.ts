import fetcher from '@/apis/fetcher/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export const getMember = async () => {
  const response = await fetcher.get({
    url: `${API_URL}/member`,
    errorMessage: ERROR_MESSAGES.GET_MEMBER,
  });
  return response.json();
};

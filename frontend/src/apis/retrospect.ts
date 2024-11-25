import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface AddRetrospectRequest {
  accessCode: string;
  answers: string[];
}

export const addRetrospect = async ({ accessCode, answers }: AddRetrospectRequest) => {
  await fetcher.post({
    url: `${API_URL}/retrospects`,
    body: JSON.stringify({ accessCode, answers }),
    errorMessage: ERROR_MESSAGES.ADD_RETROSPECT,
  });
};

interface GetRetrospectResponse {
  answers: string[];
}

export const getRetrospect = async (accessCode: string): Promise<GetRetrospectResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/retrospects/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_RETROSPECT,
  });

  return await response.json();
};

export const deleteRetrospect = async ({ accessCode }: { accessCode: string }) => {
  await fetcher.delete({
    url: `${API_URL}/retrospects/${accessCode}`,
    errorMessage: ERROR_MESSAGES.DELETE_RETROSPECT,
  });
};

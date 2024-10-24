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

interface GetRetrospectRequest {
  accessCode: string;
}

interface GetRetrospectResponse {
  answers: string[];
}

export const getRetrospectAnswer = async ({ accessCode }: GetRetrospectRequest): Promise<GetRetrospectResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/retrospects/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_RETROSPECT,
  });

  return await response.json();
};

export const deleteRetrospectAnswer = async ({ accessCode }: GetRetrospectRequest) => {
  await fetcher.delete({
    url: `${API_URL}/retrospects/${accessCode}`,
    errorMessage: ERROR_MESSAGES.DELETE_RETROSPECT,
  });
};

export interface Retrospect {
  accessCode: string;
  answer: string;
}

export const getUserRetrospects = async (): Promise<{ retrospects: Retrospect[] }> => {
  const response = await fetcher.get({
    url: `${API_URL}/retrospects`,
    errorMessage: ERROR_MESSAGES.GET_USER_RETROSPECTS,
  });

  return await response.json();
};

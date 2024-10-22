import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface AddRetrospectRequest {
  accessCode: string;
  answers: string[];
}

export const addRetrospect = async ({ accessCode, answers }: AddRetrospectRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/retrospects`,
    body: JSON.stringify({ accessCode, answers }),
    errorMessage: ERROR_MESSAGES.ADD_RETROSPECT,
  });

  return await response.json();
};

interface GetRetrospectRequest {
  retrospectId: string;
}

interface GetRetrospectResponse {
  accessCode: string;
  answers: string[];
}

export const getRetrospectAnswer = async ({ retrospectId }: GetRetrospectRequest): Promise<GetRetrospectResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/retrospects/${retrospectId}`,
    errorMessage: ERROR_MESSAGES.GET_RETROSPECT,
  });

  return await response.json();
};

export interface Retrospect {
  retrospectId: number;
  accessCode: string;
  answer: string;
}

interface GetUserRetrospectsRequest {
  retrospects: Retrospect[];
}

export const getUserRetrospects = async (accessCode: string): Promise<GetUserRetrospectsRequest> => {
  const response = await fetcher.get({
    url: `/retrospects/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_USER_RETROSPECTS,
  });

  return await response.json();
};

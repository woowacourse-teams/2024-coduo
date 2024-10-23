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

export const deleteRetrospectAnswer = async ({ retrospectId }: GetRetrospectRequest) => {
  await fetcher.delete({
    url: `${API_URL}/retrospects/${retrospectId}`,
    errorMessage: ERROR_MESSAGES.DELETE_RETROSPECT,
  });
};

export interface Retrospect {
  retrospectId: string;
  accessCode: string;
  answer: string;
}

interface GetUserRetrospectsRequest {
  retrospects: Retrospect[];
}

export const getUserRetrospects = async (): Promise<GetUserRetrospectsRequest> => {
  const response = await fetcher.get({
    url: `${API_URL}/retrospects`,
    errorMessage: ERROR_MESSAGES.GET_USER_RETROSPECTS,
  });

  return await response.json();
};

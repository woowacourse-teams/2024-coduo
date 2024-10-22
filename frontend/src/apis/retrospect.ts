import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface AddRetrospectRequest {
  pairRoomAccessCode: string;
  answer: string[];
}

export const addRetrospect = async ({ pairRoomAccessCode, answer }: AddRetrospectRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/retrospects`,
    body: JSON.stringify({ pairRoomAccessCode, answer }),
    errorMessage: ERROR_MESSAGES.ADD_RETROSPECT,
  });

  return await response.json();
};

interface GetRetrospectRequest {
  retrospectId: string;
}

interface GetRetrospectResponse {
  pairRoomAccessCode: string;
  answer: string[];
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
  pairRoomAccessCode: string;
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

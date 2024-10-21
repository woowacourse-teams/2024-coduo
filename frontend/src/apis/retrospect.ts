import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface AddRetrospectRequest {
  pairRoomAccessCode: string;
  answers: string[];
}

export const addRetrospect = async ({ pairRoomAccessCode, answers }: AddRetrospectRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/retrospect`,
    body: JSON.stringify({ pairRoomAccessCode, answers }),
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
    url: `${API_URL}/retrospect/${retrospectId}`,
    errorMessage: ERROR_MESSAGES.GET_RETROSPECT,
  });


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

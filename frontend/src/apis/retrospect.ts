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

  return await response.json();
};

import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

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

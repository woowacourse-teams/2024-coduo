import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

interface GetPairNamesResponse {
  id: number;
  firstPair: string;
  secondPair: string;
}

export const getPairNames = async (accessCode: string): Promise<GetPairNamesResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_NAMES,
  });

  return await response.json();
};

interface AddPairNamesRequest {
  firstPair: string;
  secondPair: string;
}

export const addPairNames = async ({ firstPair, secondPair }: AddPairNamesRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/pair-room`,
    body: JSON.stringify({ firstPair, secondPair }),
    errorMessage: '',
  });

  const { accessCode } = await response.json();

  return accessCode;
};

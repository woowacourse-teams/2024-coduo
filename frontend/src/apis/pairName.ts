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

// export const addPairNames = async (body: PairNameRequest) => {
//   const response = await fetcher.post({ url: `${API_URL}/pair-room`, body, errorMessage: '' });
//   const pairRoomCode = await response.json();

//   return pairRoomCode;
// };

interface AddPairNamesRequest {
  firstPair: string;
  secondPair: string;
}

export const addPairNames = async ({ firstPair, secondPair }: AddPairNamesRequest) => {
  const response = await fetch(`${API_URL}/pair-room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstPair, secondPair }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.ADD_PAIR_NAMES);
  }

  const data = await response.json();

  return data.accessCode;
};

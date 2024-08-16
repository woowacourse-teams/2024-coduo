import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface PairRoom {
  id: number;
  firstPair: string;
  secondPair: string;
  timerDuration: number | null;
}

export const getPairRoom = async (accessCode: string): Promise<PairRoom> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
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

interface UpdateTimerRequest {
  timer: number;
  accessCode: string;
}

export const updateTimer = async ({ timer, accessCode }: UpdateTimerRequest) => {
  await fetcher.patch({
    url: `${API_URL}/pair-room/${accessCode}/timer`,
    body: JSON.stringify({ timerDuration: timer }),
    errorMessage: '',
  });
};

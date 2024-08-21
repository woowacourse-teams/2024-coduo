import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export interface PairRoom {
  id: number;
  firstPair: string;
  secondPair: string;
  status: string;
}

export const getPairRoom = async (accessCode: string): Promise<PairRoom> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
  });

  return await response.json();
};

export interface PairRoomHistory {
  id: number;
  driver: string;
  navigator: string;
  timerRound: number;
  timerDuration: number;
  timerRemainingTime: number;
}

export const getPairRoomHistory = async (accessCode: string): Promise<PairRoomHistory> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/history/latest`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
  });

  return await response.json();
};

interface AddPairRoomRequest {
  firstPair: string;
  secondPair: string;
}

export const addPairRoom = async ({ firstPair, secondPair }: AddPairRoomRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/pair-room`,
    body: JSON.stringify({ firstPair, secondPair, status: 'IN_PROGRESS' }),
    errorMessage: '',
  });

  const { accessCode } = await response.json();

  return accessCode;
};

interface AddPairRoomHistoryRequest {
  driver: string;
  navigator: string;
  timerDuration: number;
  timerRemainingTime: number;
  accessCode: string;
}

export const addPairRoomHistory = async ({
  driver,
  navigator,
  timerDuration,
  timerRemainingTime,
  accessCode,
}: AddPairRoomHistoryRequest) => {
  await fetcher.post({
    url: `${API_URL}/${accessCode}/history`,
    body: JSON.stringify({ driver, navigator, timerDuration, timerRemainingTime }),
    errorMessage: '',
  });
};

interface UpdateTimerRequest {
  timer: string;
  accessCode: string;
}

export const updateTimer = async ({ timer, accessCode }: UpdateTimerRequest) => {
  await fetcher.patch({
    url: `${API_URL}/pair-room/${accessCode}/timer`,
    body: JSON.stringify({ timerDuration: Number(timer) * 60 * 1000 }),
    errorMessage: '',
  });
};

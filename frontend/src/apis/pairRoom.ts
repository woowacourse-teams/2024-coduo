import fetcher from '@/apis/fetcher/fetcher';

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

interface UpdateTimerDurationRequest {
  timerDuration: string;
  accessCode: string;
}

export const updateTimerDuration = async ({ timerDuration, accessCode }: UpdateTimerDurationRequest) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/history/latest/timer-duration`,
    body: JSON.stringify({ timerDuration: Number(timerDuration) * 60 * 1000 }),
    errorMessage: '',
  });

  await fetcher.patch({
    url: `${API_URL}/${accessCode}/history/latest/timer-remaining-time`,
    body: JSON.stringify({ timerRemainingTime: Number(timerDuration) * 60 * 1000 }),
    errorMessage: '',
  });
};

interface UpdateRemainingTimeRequest {
  remainingTime: number;
  accessCode: string;
}

export const updateRemainingTime = async ({ remainingTime, accessCode }: UpdateRemainingTimeRequest) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/history/latest/timer-remaining-time`,
    body: JSON.stringify({ timerRemainingTime: remainingTime }),
    errorMessage: '',
  });
};

import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export type PairRoomStatus = 'IN_PROGRESS' | 'COMPLETED';

export interface GetPairRoomResponse {
  id: number;
  navigator: string;
  driver: string;
  status: PairRoomStatus;
}

export const getPairRoom = async (accessCode: string): Promise<GetPairRoomResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
  });

  return await response.json();
};

interface AddPairRoomRequest {
  driver: string;
  navigator: string;
  timerDuration: number;
  timerRemainingTime: number;
}

export const addPairRoom = async ({ driver, navigator, timerDuration, timerRemainingTime }: AddPairRoomRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/pair-room`,
    body: JSON.stringify({ driver, navigator, timerDuration, timerRemainingTime, status: 'IN_PROGRESS' }),
    errorMessage: '',
  });

  const { accessCode } = await response.json();

  return accessCode;
};

interface UpdatePairRoleRequest {
  accessCode: string;
}

export const updatePairRole = async ({ accessCode }: UpdatePairRoleRequest) => {
  await fetcher.patch({
    url: `${API_URL}/pair-room/${accessCode}/pair-swap`,
    errorMessage: '',
  });
};

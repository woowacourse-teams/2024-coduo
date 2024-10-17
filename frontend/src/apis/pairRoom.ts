import fetcher from '@/apis/fetcher';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export type PairRoomStatus = 'IN_PROGRESS' | 'COMPLETED';

export interface GetPairRoomResponse {
  id: number;
  driver: string;
  navigator: string;
  missionUrl: string;
  status: PairRoomStatus;
}

export const getPairRoom = async (accessCode: string): Promise<GetPairRoomResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
  });

  return await response.json();
};

export const getPairRoomExists = async (accessCode: string): Promise<{ exists: boolean }> => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room/exists?access_code=${accessCode}`,
    errorMessage: ERROR_MESSAGES.GET_PAIR_ROOM,
  });

  return await response.json();
};

interface AddPairRoomRequest {
  driver: string;
  navigator: string;
  missionUrl: string;
  timerDuration: number;
  timerRemainingTime: number;
}

export const addPairRoom = async ({
  driver,
  navigator,
  missionUrl,
  timerDuration,
  timerRemainingTime,
}: AddPairRoomRequest) => {
  const response = await fetcher.post({
    url: `${API_URL}/pair-room`,
    body: JSON.stringify({ driver, navigator, missionUrl, timerDuration, timerRemainingTime }),
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

interface UpdatePairRoomStatusRequest {
  accessCode: string;
}

export const updatePairRoomStatus = async ({ accessCode }: UpdatePairRoomStatusRequest) => {
  await fetcher.patch({
    url: `${API_URL}/pair-room/${accessCode}/complete`,
    errorMessage: ERROR_MESSAGES.UPDATE_PAIR_ROOM_STATUS,
  });
};

export const deletePairRoom = async (accessCode: string) => {
  await fetcher.delete({
    url: `${API_URL}/pair-room/${accessCode}`,
    errorMessage: ERROR_MESSAGES.DELETE_PAIR_ROOM,
  });
};

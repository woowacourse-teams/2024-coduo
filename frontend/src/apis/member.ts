import fetcher from '@/apis/fetcher';
import type { PairRoomStatus } from '@/apis/pairRoom';

import { ERROR_MESSAGES } from '@/constants/message';

const API_URL = process.env.REACT_APP_API_URL;

export const getSignOut = async (): Promise<void> => {
  await fetcher.get({
    url: `${API_URL}/sign-out`,
    errorMessage: ERROR_MESSAGES.SIGN_OUT,
  });
};

export const getMember = async (): Promise<{ username: string }> => {
  const response = await fetcher.get({
    url: `${API_URL}/member`,
    errorMessage: ERROR_MESSAGES.GET_MEMBER,
  });

  return response.json();
};

export const deleteMember = async () => {
  await fetcher.delete({
    url: `${API_URL}/member`,
    errorMessage: ERROR_MESSAGES.DELETE_MEMBER,
  });
};

interface GetMyPairRoomsResponse {
  id: number;
  status: PairRoomStatus;
  navigator: string;
  driver: string;
  accessCode: string;
}

export const getMyPairRooms = async (): Promise<GetMyPairRoomsResponse[]> => {
  const response = await fetcher.get({
    url: `${API_URL}/my-pair-rooms`,
    errorMessage: ERROR_MESSAGES.GET_MEMBER,
  });

  return response.json();
};

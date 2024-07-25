import fetcher from '@/apis/fetcher';

import { API_URL } from '@/constants/api';

export const getPairNames = async (accessCode: string) => {
  const response = await fetcher.get({
    url: `${API_URL}/pair-room?accessCode=${accessCode}`,
    errorMessage: '',
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
    throw new Error('페어룸 생성에 실패했습니다.');
  }

  const data = await response.json();

  return data.accessCode;
};

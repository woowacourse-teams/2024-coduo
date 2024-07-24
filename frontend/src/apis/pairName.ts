import fetcher from '@/apis/fetcher';

interface PairNameRequest extends Record<string, string> {
  firstPairName: string;
  secondPairName: string;
}

const baseURL = 'http://localhost:3000';

export const addPairNames = async (body: PairNameRequest) => {
  const response = await fetcher.post({ url: `${baseURL}/pair-room`, body, errorMessage: '' });
  const pairRoomCode = await response.json();

  return pairRoomCode;
};

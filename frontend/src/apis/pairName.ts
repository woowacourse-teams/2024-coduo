import fetcher from '@/apis/fetcher';

interface PairNameBody extends Record<string, string | number> {
  firstPairName: string;
  secondPairName: string;
}

const baseURL = 'http://localhost:3000';

export const addPairName = async (body: PairNameBody) => {
  const response = await fetcher.post({ url: `${baseURL}/pair-room`, body, errorMessage: '' });
  const pairRoomCode = await response.json();
  return pairRoomCode;
};

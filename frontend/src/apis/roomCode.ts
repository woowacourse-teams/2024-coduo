import fetcher from '@/apis/fetcher';

const baseURL = 'http://localhost:3000';
//TODO: env 수정

export const addRoomCode = async (roomCode: string) => {
  const response = await fetcher.post({ url: `${baseURL}/pair-room`, body: { roomCode }, errorMessage: '' });

  return { response };
};

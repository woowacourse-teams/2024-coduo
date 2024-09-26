import fetcher from '@/apis/fetcher';

const API_URL = process.env.REACT_APP_API_URL;

export const getSSEConnection = (accessCode: string) => {
  return new EventSource(`${API_URL}/${accessCode}/connect`);
};

export interface GetTimerResponse {
  id: number;
  duration: number;
  remainingTime: number;
}

export const getTimer = async (accessCode: string): Promise<GetTimerResponse> => {
  const response = await fetcher.get({
    url: `${API_URL}/${accessCode}/timer`,
    errorMessage: '',
  });

  return response.json();
};

interface UpdateDurationRequest {
  duration: string;
  accessCode: string;
}

export const updateDuration = async ({ duration, accessCode }: UpdateDurationRequest) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/timer`,
    body: JSON.stringify({ duration: Number(duration) * 60 * 1000, remainingTime: Number(duration) * 60 * 1000 }),
    errorMessage: '',
  });
};

export const startTimer = async (accessCode: string) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/timer/start`,
    errorMessage: '',
  });
};

export const stopTimer = async (accessCode: string) => {
  await fetcher.patch({
    url: `${API_URL}/${accessCode}/timer/stop`,
    errorMessage: '',
  });
};

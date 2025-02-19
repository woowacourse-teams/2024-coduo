import fetcher from '@/apis/http/fetcher';

const API_URL = process.env.REACT_APP_API_URL;

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
    url: `${API_URL}/${accessCode}/timer/pause`,
    errorMessage: '',
  });
};

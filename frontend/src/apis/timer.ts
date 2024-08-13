import fetcher from '@/apis/fetcher';

const API_URL = process.env.REACT_APP_API_URL;

interface AddTimerRequest {
  timer: string;
  accessCode: string;
}

export const addTimer = async ({ timer, accessCode }: AddTimerRequest) => {
  await fetcher.post({
    url: `${API_URL}/pair-room/${accessCode}/info`,
    body: JSON.stringify({ time_duration: timer }),
    errorMessage: '',
  });
};

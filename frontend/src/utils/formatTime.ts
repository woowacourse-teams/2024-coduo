const formatMinutes = (minutes: number) => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const formatSeconds = (seconds: number) => (seconds < 10 ? `0${seconds}` : `${seconds}`);

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = Math.floor((time % 60000) / 1000);

  return { minutes: formatMinutes(minutes), seconds: formatSeconds(seconds) };
};

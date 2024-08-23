export const validateTimerDuration = (timerDuration: string) => {
  if (Number.isNaN(Number(timerDuration))) return false;
  if (Number(timerDuration) <= 0) return false;

  return true;
};

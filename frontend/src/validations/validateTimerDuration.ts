export const validateTimerDuration = (timerDuration: string) => {
  if (Number.isNaN(Number(timerDuration))) return false;
  if (Number(timerDuration) <= 0 || Number(timerDuration) >= 100) return false;

  return true;
};

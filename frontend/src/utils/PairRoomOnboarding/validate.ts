export const validateTime = (time: number) => {
  if (time <= 0) return false;
  if (Number.isNaN(time)) return false;

  return true;
};

export const validateTime = (time: number) => {
  if (Number.isNaN(time)) return false;
  if (time < 0) return false;

  return true;
};

export const validateTime = (time: string) => {
  if (Number.isNaN(time)) return false;
  if (Number(time) <= 0) return false;

  return true;
};

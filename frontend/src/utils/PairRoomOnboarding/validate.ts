export const validateTime = (time: string) => {
  if (time === '') return false;
  if (Number.isNaN(Number(time))) return false;
  if (Number(time) < 0) return false;

  return true;
};
